'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BuyerMessagesPage() {
  const { buyerData } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  if (!buyerData) return null;

  const filteredMessages = buyerData.messages.filter(message =>
    message.candidateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = buyerData.messages.filter(m => m.unread).length;

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2 
      ? `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const selectedMessage = buyerData.messages.find(m => m.id === selectedConversation);

  return (
    <div className="max-w-6xl h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          {unreadCount > 0 && (
            <Badge className="bg-blue-600 text-white hover:bg-blue-600">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1">Communicate with candidates</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex h-[calc(100%-5rem)]">
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-gray-200 text-sm"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No conversations found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedConversation(message.id)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                      selectedConversation === message.id && "bg-blue-50 hover:bg-blue-50",
                      message.unread && "bg-blue-50/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.candidateProfilePicture || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                          {getInitials(message.candidateName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={cn(
                            "text-sm truncate",
                            message.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"
                          )}>
                            {message.candidateName}
                          </span>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                            {formatDate(message.lastMessageDate)}
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm truncate",
                          message.unread ? "text-gray-700" : "text-gray-500"
                        )}>
                          {message.lastMessage}
                        </p>
                      </div>
                      {message.unread && (
                        <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message View */}
        <div className="flex-1 flex flex-col">
          {selectedConversation && selectedMessage ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedMessage.candidateProfilePicture || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                    {getInitials(selectedMessage.candidateName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedMessage.candidateName}</h3>
                  <p className="text-xs text-gray-500">Candidate</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <div className="flex flex-col items-end">
                  <div className="bg-white rounded-xl p-4 shadow-sm max-w-md">
                    <p className="text-gray-700">{selectedMessage.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDate(selectedMessage.lastMessageDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1 border-gray-200"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Select a conversation</h3>
                <p className="text-gray-500 text-sm">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Mail, Trash2, CheckCircle, MailOpen } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/app/actions/contact.actions";
import { toast } from "sonner";
import { AdminModal } from "../ui/AdminModal";
import { AdminButton } from "../ui/AdminButton";

export function InboxList({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  const handleMarkRead = async (id: string) => {
    try {
      await markMessageRead(id);
      setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    } catch (e) {
      toast.error("Failed to mark read");
    }
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    try {
      await deleteMessage(messageToDelete);
      setMessages((msgs) => msgs.filter((m) => m.id !== messageToDelete));
      setSelectedMessage(null);
      setIsDeleteModalOpen(false);
      toast.success("Message deleted");
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  const openDeleteModal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex h-[800px] flex-col gap-6 lg:flex-row">
      {/* Left Pane: Message List */}
      <div className="glass-panel flex w-full flex-col overflow-hidden rounded-3xl border border-white/5 lg:w-1/3">
        <div className="border-b border-white/5 bg-white/5 p-4">
          <h3 className="flex items-center gap-2 font-bold text-white">
            <Mail className="h-4 w-4" /> Inbox
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-muted-foreground p-8 text-center text-sm">No messages.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.isRead) handleMarkRead(msg.id);
                  }}
                  className={`cursor-pointer p-4 transition-colors ${selectedMessage?.id === msg.id ? "bg-white/10" : "hover:bg-white/5"} ${!msg.isRead ? "border-l-accent-blue bg-accent-blue/5 border-l-2" : ""}`}
                >
                  <div className="mb-1 flex items-start justify-between">
                    <span
                      className={`text-sm ${!msg.isRead ? "font-bold text-white" : "text-muted-foreground font-medium"}`}
                    >
                      {msg.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div
                    className={`mb-1 text-sm ${!msg.isRead ? "font-bold text-white" : "text-white/80"}`}
                  >
                    {msg.subject}
                  </div>
                  <div className="text-muted-foreground truncate text-xs">{msg.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Message Viewer */}
      <div className="glass-panel flex w-full flex-col rounded-3xl border border-white/5 p-6 lg:w-2/3">
        {selectedMessage ? (
          <div className="flex h-full flex-col">
            <div className="mb-8 flex items-start justify-between border-b border-white/5 pb-6">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-white">{selectedMessage.subject}</h2>
                <div className="text-muted-foreground text-sm">
                  From: <span className="text-white">{selectedMessage.name}</span> &lt;
                  {selectedMessage.email}&gt;
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <AdminButton
                  variant="danger"
                  onClick={(e) => openDeleteModal(selectedMessage.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </AdminButton>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="prose prose-invert max-w-none font-sans text-sm leading-relaxed whitespace-pre-wrap text-white/80">
                {selectedMessage.message}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center">
            <MailOpen className="mb-4 h-12 w-12 opacity-20" />
            <p>Select a message to read</p>
          </div>
        )}
      </div>

      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Message"
        description="Are you sure you want to permanently delete this message? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { getAllContactMessages, adminReply } from "../../api/api";

import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCalendar,
  FaTrash,
  // FaEye,
  // FaEyeSlash,
  FaSearch,
  FaFilter,
  FaSort,
  FaExclamationTriangle,
  FaCheckCircle,
  FaReply,
  FaPaperPlane,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await getAllContactMessages();
      const sortedMessages = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMessages(sortedMessages);
      setFilteredMessages(sortedMessages);
      setTotalPages(Math.ceil(sortedMessages.length / pageSize));
    } catch (err) {
      console.error(err);
      alert("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = [...messages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter === "read") {
      filtered = filtered.filter((msg) => msg.isRead);
    } else if (statusFilter === "unread") {
      filtered = filtered.filter((msg) => !msg.isRead);
    }

    // Sort filter
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredMessages(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setPage(1);
  }, [messages, searchTerm, statusFilter, sortBy, pageSize]);

  const paginatedMessages = filteredMessages.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        // await deleteContactMessage(id);
        setMessages(messages.filter((msg) => msg.id !== id));
        alert("Message deleted successfully");
      } catch (err) {
        alert("Failed to delete message");
      }
    }
  };

  const handleMarkRead = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  // const handleSendReply = async (messageId, email) => {
  //   if (!replyText.trim()) {
  //     alert("Please enter a reply message");
  //     return;
  //   }

  //   try {
  //     setSendingReply(true);
  //     // In a real app, you would call an API to send email
  //     console.log(`Sending reply to ${email}: ${replyText}`);

  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     alert(`Reply sent to ${email} successfully!`);
  //     setReplyText("");
  //     setSelectedMessage(null);
  //   } catch (err) {
  //     alert("Failed to send reply");
  //   } finally {
  //     setSendingReply(false);
  //   }
  // };

  const handleSendReply = async (messageId, email) => {
    if (!replyText.trim()) {
      alert("Please enter a reply message");
      return;
    }

    try {
      setSendingReply(true);

      // API call
      await adminReply(messageId, replyText);

      alert(`Reply sent to ${email} successfully!`);

      // Update local state – mark as read and store reply
      setMessages(
        messages.map((msg) =>
          msg.id === messageId
            ? { ...msg, isRead: true, adminReply: replyText }
            : msg
        )
      );

      setReplyText("");
      setSelectedMessage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading contact messages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-28">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <FaEnvelope className="text-3xl" /> Contact Messages
              </h1>
              <p className="opacity-90 text-red-100">
                Manage all user inquiries and feedback
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <FaFileAlt />
                <span className="font-bold">
                  {messages.length} Total Messages
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-5 rounded-2xl shadow-lg mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Messages
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2" /> Filter by Status
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaSort className="inline mr-2" /> Sort by
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paginatedMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                message.isRead ? "border-gray-200" : "border-red-300"
              }`}
            >
              {/* Message Header */}
              <div
                className={`p-5 ${
                  message.isRead
                    ? "bg-gray-50"
                    : "bg-gradient-to-r from-red-50 to-pink-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        message.isRead
                          ? "bg-gray-200"
                          : "bg-gradient-to-r from-red-500 to-red-600"
                      }`}
                    >
                      <FaUser
                        className={
                          message.isRead ? "text-gray-600" : "text-white"
                        }
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {message.name}
                      </h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                  </div>
                  {!message.isRead && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                      <FaExclamationTriangle /> NEW
                    </span>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="p-5">
                <div className="space-y-4">
                  {/* Phone */}
                  {message.phone && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaPhone className="text-red-500" />
                      <span className="font-medium">{message.phone}</span>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-red-500" /> Message
                    </h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {message.message}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <FaCalendar className="text-red-400" />
                    <span>{formatDate(message.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 border-t border-gray-100 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {!message.isRead && (
                    <button
                      onClick={() => handleMarkRead(message.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-300"
                    >
                      <FaCheckCircle /> Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedMessage(message)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-300"
                  >
                    <FaReply /> Reply
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-300"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Messages State */}
        {paginatedMessages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No Messages Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No contact messages have been received yet"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-600">
                Showing{" "}
                <span className="font-bold">{(page - 1) * pageSize + 1}</span>{" "}
                to{" "}
                <span className="font-bold">
                  {Math.min(page * pageSize, filteredMessages.length)}
                </span>{" "}
                of <span className="font-bold">{filteredMessages.length}</span>{" "}
                messages
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <FaArrowLeft /> Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-bold transition-all duration-300 ${
                          page === pageNum
                            ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className={`px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-red-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-3xl z-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaReply className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Reply to {selectedMessage.name}
                    </h2>
                    <p className="opacity-90">{selectedMessage.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedMessage(null);
                    setReplyText("");
                  }}
                  className="text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Original Message */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaFileAlt className="text-red-500" /> Original Message
                </h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-gray-700">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Reply Form */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaPaperPlane className="text-red-500" /> Your Reply
                </h3>
                <textarea
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-200 rounded-b-3xl">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedMessage(null);
                    setReplyText("");
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-bold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleSendReply(selectedMessage.id, selectedMessage.email)
                  }
                  disabled={sendingReply || !replyText.trim()}
                  className={`px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 ${
                    sendingReply || !replyText.trim()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {sendingReply ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

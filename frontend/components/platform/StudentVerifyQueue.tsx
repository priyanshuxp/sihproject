"use client";

import React, { useState } from "react";
import { VerificationQueueItem } from "@/types/platform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, FileText, Search } from "lucide-react";

interface StudentVerifyQueueProps {
  items: VerificationQueueItem[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function StudentVerifyQueue({
  items: initialItems,
  onApprove,
  onReject,
}: StudentVerifyQueueProps) {
  const [items, setItems] = useState<VerificationQueueItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "VERIFIED" as const } : item))
    );
    if (onApprove) onApprove(id);
  };

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "REJECTED" as const } : item))
    );
    if (onReject) onReject(id);
  };

  const filteredItems = items.filter(
    (item) =>
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000]">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-4 border-b-4 border-black bg-[#FFD93D]">
        <div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight text-black">Student Verification Queue</CardTitle>
          <p className="text-sm font-bold text-black mt-1">
            Review and authenticate student enrollment requests, transcripts, and institutional credentials.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3.5 size-4 text-black" />
          <input
            type="text"
            placeholder="Search student or enrollment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-none border-4 border-black bg-white pl-10 pr-4 py-2.5 text-xs font-bold text-black focus:outline-none focus:bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto rounded-none border-4 border-black shadow-[6px_6px_0px_0px_#000]">
          <Table>
            <TableHeader className="bg-[#FFFDF5] border-b-4 border-black">
              <TableRow>
                <TableHead className="font-black uppercase text-black">Student Name</TableHead>
                <TableHead className="font-black uppercase text-black">Enrollment ID</TableHead>
                <TableHead className="font-black uppercase text-black">Department / Batch</TableHead>
                <TableHead className="font-black uppercase text-black">Document Type</TableHead>
                <TableHead className="font-black uppercase text-black">Status</TableHead>
                <TableHead className="text-right font-black uppercase text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center font-bold text-muted-foreground">
                    No verification requests found in the queue.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-[#FFFDF5] transition-colors border-b-2 border-black">
                    <TableCell className="font-black">
                      <div>
                        <p className="text-black font-black">{item.studentName}</p>
                        <p className="text-xs font-bold text-muted-foreground">{item.studentEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono font-bold">{item.enrollmentNumber}</TableCell>
                    <TableCell>
                      <p className="text-xs font-black text-black">{item.department}</p>
                      <p className="text-[10px] font-bold text-muted-foreground">Batch {item.batchYear}</p>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-[#C4B5FD] border-2 border-black px-2.5 py-1 rounded-none shadow-[2px_2px_0px_0px_#000]">
                        <FileText className="size-3.5" />
                        {item.documentType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-[10px] font-black uppercase rounded-none border-2 border-black px-2.5 py-1 ${
                          item.status === "VERIFIED"
                            ? "bg-emerald-300 text-black"
                            : item.status === "REJECTED"
                            ? "bg-[#FF6B6B] text-black"
                            : "bg-[#FFD93D] text-black"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="h-9 px-3 bg-emerald-400 hover:bg-emerald-500 text-black border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none gap-1 rounded-none"
                          onClick={() => handleApprove(item.id)}
                          disabled={item.status === "VERIFIED"}
                        >
                          <CheckCircle2 className="size-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          className="h-9 px-3 bg-[#FF6B6B] hover:bg-[#ff5252] text-black border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none gap-1 rounded-none"
                          onClick={() => handleReject(item.id)}
                          disabled={item.status === "REJECTED"}
                        >
                          <XCircle className="size-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

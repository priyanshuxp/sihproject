"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, GraduationCap, CheckCircle2, AlertCircle } from "lucide-react";

interface InstituteLinkerGateProps {
  isLinked: boolean;
  instituteName?: string;
  enrollmentId?: string;
  onLinkInstitute?: (instituteName: string, enrollmentId: string) => void;
}

export function InstituteLinkerGate({
  isLinked: initialIsLinked,
  instituteName: initialInstituteName = "",
  enrollmentId: initialEnrollmentId = "",
  onLinkInstitute,
}: InstituteLinkerGateProps) {
  const [isLinked, setIsLinked] = useState(initialIsLinked);
  const [instituteName, setInstituteName] = useState(initialInstituteName);
  const [enrollmentId, setEnrollmentId] = useState(initialEnrollmentId);
  const [selectedUniv, setSelectedUniv] = useState("National Institute of Technology");
  const [inputEnrollment, setInputEnrollment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEnrollment.trim()) return;
    setIsLinked(true);
    setInstituteName(selectedUniv);
    setEnrollmentId(inputEnrollment);
    if (onLinkInstitute) {
      onLinkInstitute(selectedUniv, inputEnrollment);
    }
  };

  if (isLinked) {
    return (
      <Card className="rounded-none border-4 border-black bg-[#a7f3d0] shadow-[8px_8px_0px_0px_#000]">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-none bg-emerald-500 border-4 border-black text-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_#000]">
              <GraduationCap className="size-7 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black uppercase text-black">Linked to {instituteName}</h4>
                <Badge className="bg-black text-white border-2 border-black text-[10px] font-black rounded-none">
                  VERIFIED INSTITUTE
                </Badge>
              </div>
              <p className="text-xs font-bold text-black mt-1">
                Enrollment ID: <span className="font-mono font-bold">{enrollmentId || "CS-2023-401"}</span> • Status: Active student membership
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-black text-xs font-black uppercase">
            <CheckCircle2 className="size-6 text-emerald-700" />
            <span>Synchronized</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000] overflow-hidden">
      <div className="bg-[#FFD93D] px-6 py-3 border-b-4 border-black flex items-center gap-2 text-black text-xs font-black uppercase tracking-wider">
        <AlertCircle className="size-5" />
        Action Required: Register in Your Institute
      </div>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-black uppercase tracking-tight">Connect Your Academic Profile</CardTitle>
        <p className="text-sm font-bold text-muted-foreground">
          Link your student account to your accredited university or college placement cell to unlock certified badges and direct employer interview queues.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-black">
              Select Accredited Institution
            </label>
            <div className="relative">
              <Building className="absolute left-3.5 top-3.5 size-5 text-black" />
              <select
                value={selectedUniv}
                onChange={(e) => setSelectedUniv(e.target.value)}
                className="w-full rounded-none border-4 border-black bg-[#FFFDF5] pl-11 pr-4 py-3 text-sm font-bold text-black focus:outline-none focus:bg-[#FFD93D] shadow-[4px_4px_0px_0px_#000]"
              >
                <option value="National Institute of Technology">National Institute of Technology (NIT)</option>
                <option value="Apex Institute of Technology">Apex Institute of Technology</option>
                <option value="Global School of Engineering">Global School of Engineering & Tech</option>
                <option value="Metropolitan Technical University">Metropolitan Technical University</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-black">
              University Enrollment / Student ID
            </label>
            <input
              type="text"
              placeholder="e.g. CS-2026-8921"
              value={inputEnrollment}
              onChange={(e) => setInputEnrollment(e.target.value)}
              className="w-full rounded-none border-4 border-black bg-[#FFFDF5] px-4 py-3 text-sm font-bold text-black focus:outline-none focus:bg-[#FFD93D] shadow-[4px_4px_0px_0px_#000]"
              required
            />
            <p className="text-xs font-bold text-muted-foreground">
              Your enrollment ID will be verified securely against your institute&apos;s registrar database.
            </p>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 font-black uppercase tracking-wider bg-[#FF6B6B] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:bg-[#ff5252] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              Link Institute & Request Verification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

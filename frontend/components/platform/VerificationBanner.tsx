"use client";

import React from "react";
import { PlatformStatus } from "@/types/platform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertTriangle, Clock, RefreshCcw } from "lucide-react";

interface VerificationBannerProps {
  status: PlatformStatus;
  entityName?: string;
  onResubmit?: () => void;
}

export function VerificationBanner({
  status,
  entityName = "Account",
  onResubmit,
}: VerificationBannerProps) {
  if (status === "VERIFIED") {
    return (
      <div className="rounded-none border-4 border-black bg-[#a7f3d0] p-4 flex items-center justify-between shadow-[6px_6px_0px_0px_#000]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-none bg-emerald-500 border-2 border-black text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <ShieldCheck className="size-6 stroke-[3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black uppercase text-black">{entityName} Verified</h4>
              <Badge className="bg-black text-white border-2 border-black text-[10px] font-black rounded-none">
                VERIFIED
              </Badge>
            </div>
            <p className="text-xs font-bold text-black mt-0.5">
              Your credentials and registration data have been fully verified by the SkillBridge trust network.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "PENDING") {
    return (
      <div className="rounded-none border-4 border-black bg-[#FFD93D] p-4 flex items-center justify-between shadow-[6px_6px_0px_0px_#000]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-none bg-amber-400 border-2 border-black text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <Clock className="size-6 stroke-[3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black uppercase text-black">{entityName} Verification Pending</h4>
              <Badge className="bg-black text-white border-2 border-black text-[10px] font-black rounded-none">
                PENDING
              </Badge>
            </div>
            <p className="text-xs font-bold text-black mt-0.5">
              Your registration is currently under review by institutional or platform administrators. This usually takes 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-none border-4 border-black bg-[#FF6B6B] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[6px_6px_0px_0px_#000]">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-none bg-black border-2 border-black text-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#FFF]">
          <AlertTriangle className="size-6 stroke-[3]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black uppercase text-black">{entityName} Verification Rejected</h4>
            <Badge className="bg-black text-white border-2 border-black text-[10px] font-black rounded-none">
              REJECTED
            </Badge>
          </div>
          <p className="text-xs font-bold text-black mt-0.5">
            Your verification attempt was rejected due to missing documentation or mismatching enrollment records. Please update and re-submit.
          </p>
        </div>
      </div>
      {onResubmit && (
        <Button
          size="sm"
          className="font-black uppercase tracking-wider bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_#FFF] hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all gap-2 shrink-0"
          onClick={onResubmit}
        >
          <RefreshCcw className="size-4" />
          Re-submit Data
        </Button>
      )}
    </div>
  );
}

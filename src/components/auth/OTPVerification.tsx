import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPVerificationProps {
  otp: string;
  setOTP: (otp: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onBack: () => void;
}

export const OTPVerification = ({ otp, setOTP, onSubmit, onBack }: OTPVerificationProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <InputOTP
          value={otp}
          onChange={setOTP}
          maxLength={6}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} {...slot} index={index} />
              ))}
            </InputOTPGroup>
          )}
        />
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your phone
        </p>
      </div>
      <div className="space-y-2">
        <Button type="submit" className="w-full">
          Verify OTP
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onBack}
        >
          Back to Phone Entry
        </Button>
      </div>
    </form>
  );
};
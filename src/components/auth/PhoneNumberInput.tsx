import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneNumberInputProps {
  phone: string;
  setPhone: (phone: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const PhoneNumberInput = ({ phone, setPhone, onSubmit }: PhoneNumberInputProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+255123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <p className="text-sm text-gray-500">
          Enter your phone number with country code (e.g., +255 for Tanzania)
        </p>
      </div>
      <Button type="submit" className="w-full">
        Send OTP
      </Button>
    </form>
  );
};
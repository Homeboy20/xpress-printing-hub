import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

interface PhoneAuthProps {
  setError: (error: string) => void;
}

export const PhoneAuth = ({ setError }: PhoneAuthProps) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      if (error) throw error;
      setShowOTP(true);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {!showOTP ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
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
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
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
              onClick={() => setShowOTP(false)}
            >
              Back to Phone Entry
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
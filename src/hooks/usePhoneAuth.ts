import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const usePhoneAuth = (setError: (error: string) => void) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (phoneNumber: string) => {
    // First, remove all non-digit characters except plus sign
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Ensure the number starts with a plus sign
    if (!cleaned.startsWith('+')) {
      cleaned = `+${cleaned}`;
    }
    
    // MessageBird requires E.164 format
    // Remove any extra spaces or characters
    cleaned = cleaned.replace(/\s+/g, '');
    
    return cleaned;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Attempting to send OTP via MessageBird to:', formattedPhone);
      
      const { error, data } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          channel: 'sms',
          shouldCreateUser: true // Ensure user creation is allowed
        }
      });
      
      if (error) {
        console.error('MessageBird OTP Error:', error);
        if (error.message.includes('originator is invalid')) {
          throw new Error('MessageBird configuration error: Please ensure the "From" field is properly set in Supabase Auth settings.');
        }
        throw error;
      }
      
      console.log('OTP sent successfully:', data);
      setShowOTP(true);
      setError("");
    } catch (error: any) {
      console.error('MessageBird Error:', error);
      const errorMessage = error.message || 'Failed to send verification code';
      if (errorMessage.toLowerCase().includes('originator')) {
        setError('Please check if MessageBird is properly configured in Supabase Auth settings. Ensure the "From" field is set.');
      } else if (errorMessage.toLowerCase().includes('rate limit')) {
        setError('Too many attempts. Please wait a few minutes before trying again.');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Verifying OTP for:', formattedPhone);
      
      const { error, data } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms"
      });
      
      if (error) {
        console.error('Verification Error:', error);
        throw error;
      }
      
      console.log('OTP verification successful:', data);
      navigate("/");
    } catch (error: any) {
      console.error('Verification Error:', error);
      const errorMessage = error.message || 'Failed to verify code';
      if (errorMessage.toLowerCase().includes('invalid')) {
        setError('Invalid verification code. Please try again.');
      } else {
        setError(errorMessage);
      }
    }
  };

  return {
    phone,
    setPhone,
    showOTP,
    setShowOTP,
    otp,
    setOTP,
    handleSendOTP,
    handleVerifyOTP,
  };
};
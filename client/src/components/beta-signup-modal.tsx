import { useState } from "react";
import { X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBetaSignupSchema, type InsertBetaSignup } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BetaSignupModal({ isOpen, onClose }: BetaSignupModalProps) {
  const { toast } = useToast();
  
  const form = useForm<InsertBetaSignup>({
    resolver: zodResolver(insertBetaSignupSchema),
    defaultValues: {
      email: "",
      eventType: "",
    },
  });

  const betaSignupMutation = useMutation({
    mutationFn: async (data: InsertBetaSignup) => {
      return await apiRequest("POST", "/api/beta-signup", data);
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Eventsy Beta!",
        description: "We'll send you beta access and updates soon.",
      });
      form.reset();
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBetaSignup) => {
    betaSignupMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" data-testid="beta-modal">
      <div className="glass rounded-3xl p-8 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          data-testid="modal-close"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Join Eventsy Beta</h3>
          <p className="text-slate-300">Be among the first to experience AI-powered event planning</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="beta-signup-form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      data-testid="input-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Event type (e.g., Developer Conference)"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      data-testid="input-event-type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={betaSignupMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              data-testid="button-submit"
            >
              {betaSignupMutation.isPending ? "Joining Beta..." : "Get Early Access"}
            </Button>
          </form>
        </Form>
        
        <p className="text-xs text-slate-400 mt-4 text-center">
          We'll send you beta access and updates. No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

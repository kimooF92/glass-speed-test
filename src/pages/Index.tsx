import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Globe } from "lucide-react";

type TestStatus = "idle" | "testing-ping" | "testing-download" | "testing-upload" | "complete";

const Index = () => {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [ping, setPing] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  const startTest = () => {
    setStatus("testing-ping");
    setPing(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);

    // Simulate ping test
    setTimeout(() => {
      const simulatePing = setInterval(() => {
        setPing((prev) => {
          const next = prev + Math.random() * 8;
          if (next >= 25) {
            clearInterval(simulatePing);
            setStatus("testing-download");
            return 25 + Math.random() * 15;
          }
          return next;
        });
      }, 50);
    }, 500);
  };

  useEffect(() => {
    if (status === "testing-download") {
      const simulateDownload = setInterval(() => {
        setDownloadSpeed((prev) => {
          const next = prev + Math.random() * 15;
          if (next >= 150) {
            clearInterval(simulateDownload);
            setStatus("testing-upload");
            return 150 + Math.random() * 100;
          }
          return next;
        });
      }, 50);
    }
  }, [status]);

  useEffect(() => {
    if (status === "testing-upload") {
      const simulateUpload = setInterval(() => {
        setUploadSpeed((prev) => {
          const next = prev + Math.random() * 10;
          if (next >= 100) {
            clearInterval(simulateUpload);
            setStatus("complete");
            return 100 + Math.random() * 50;
          }
          return next;
        });
      }, 50);
    }
  }, [status]);

  const resetTest = () => {
    setStatus("idle");
    setPing(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Main Test Button */}
        <div className="flex flex-col items-center justify-center mb-12">
          {status === "idle" ? (
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
              <Button
                onClick={startTest}
                size="lg"
                className="relative w-64 h-64 rounded-full bg-transparent border-[3px] border-primary hover:border-primary-glow hover:shadow-glow transition-all duration-500 hover:scale-105 text-4xl font-bold tracking-wider"
              >
                GO
              </Button>
            </div>
          ) : status === "complete" ? (
            <div className="text-center">
              <div className="relative group mb-8">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
                <div className="relative w-64 h-64 rounded-full border-[3px] border-primary flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {downloadSpeed.toFixed(1)}
                  </div>
                  <div className="text-xl text-muted-foreground">Mbps</div>
                  <div className="text-sm text-muted-foreground mt-2">Download</div>
                </div>
              </div>
              <Button
                onClick={resetTest}
                variant="ghost"
                className="text-primary hover:text-primary-glow hover:bg-transparent"
              >
                Test Again
              </Button>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
              <div className="relative w-64 h-64 rounded-full border-[3px] border-primary flex flex-col items-center justify-center animate-pulse-glow">
                <div className="text-5xl font-bold text-foreground">
                  {status === "testing-download" ? downloadSpeed.toFixed(1) :
                   status === "testing-upload" ? uploadSpeed.toFixed(1) :
                   ping.toFixed(0)}
                </div>
                <div className="text-lg text-muted-foreground mt-2">
                  {status === "testing-download" ? "Mbps" :
                   status === "testing-upload" ? "Mbps" : "ms"}
                </div>
                <div className="text-sm text-primary mt-4">
                  {status === "testing-ping" && "Testing..."}
                  {status === "testing-download" && "Download"}
                  {status === "testing-upload" && "Upload"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Provider Info Section */}
        <div className="flex items-center gap-8 mb-8">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-lg font-medium text-foreground mb-1">Google</div>
              <div className="text-sm text-muted-foreground font-mono">192.168.1.1</div>
            </div>
            <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center">
            <Globe className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Right Section */}
          <div className="text-left">
            <div className="text-lg font-medium text-foreground mb-1">Internet Service Provider</div>
            <div className="text-sm text-muted-foreground mb-2">New York, US</div>
            <button className="text-sm text-primary hover:text-primary-glow transition-colors">
              Change Server
            </button>
          </div>
        </div>

        {/* Results Cards - Show when complete */}
        {status === "complete" && (
          <div className="grid grid-cols-3 gap-6 w-full max-w-2xl animate-fade-in">
            <div className="text-center p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-foreground mb-1">
                {ping.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Ping (ms)</div>
            </div>
            <div className="text-center p-6 rounded-2xl border border-primary/50 bg-primary/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-foreground mb-1">
                {downloadSpeed.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Download (Mbps)</div>
            </div>
            <div className="text-center p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-foreground mb-1">
                {uploadSpeed.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Upload (Mbps)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gauge, Download, Upload, Wifi } from "lucide-react";

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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217_91%_60%/0.2),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Speed Test
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your internet connection speed
          </p>
        </div>

        {/* Main Test Card */}
        <div className="w-full max-w-2xl backdrop-blur-glass bg-card/30 border border-border/50 rounded-3xl p-8 md:p-12 shadow-glass mb-8">
          {/* Start Button / Speed Display */}
          <div className="flex flex-col items-center justify-center mb-8">
            {status === "idle" ? (
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 blur-xl group-hover:opacity-70 transition-all duration-500" />
                <Button
                  onClick={startTest}
                  size="lg"
                  className="relative w-48 h-48 rounded-full bg-transparent border-4 border-transparent bg-clip-padding hover:bg-primary/5 transition-all duration-500 hover:scale-105 text-2xl font-bold before:absolute before:inset-0 before:rounded-full before:p-[4px] before:bg-gradient-primary before:-z-10 before:m-[-4px]"
                >
                  <Gauge className="w-12 h-12" />
                </Button>
              </div>
            ) : status === "complete" ? (
              <div className="text-center">
                <div className="text-7xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4 animate-pulse-glow">
                  {downloadSpeed.toFixed(1)}
                </div>
                <div className="text-xl text-muted-foreground mb-6">Mbps</div>
                <Button
                  onClick={resetTest}
                  variant="outline"
                  className="backdrop-blur-glass bg-card/30 border-primary/50 hover:bg-primary/10"
                >
                  Test Again
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-gradient-primary/20 border-4 border-primary/50 flex items-center justify-center mb-4 animate-pulse-glow">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-foreground">
                      {status === "testing-download" ? downloadSpeed.toFixed(1) :
                       status === "testing-upload" ? uploadSpeed.toFixed(1) :
                       ping.toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {status === "testing-download" ? "Mbps" :
                       status === "testing-upload" ? "Mbps" : "ms"}
                    </div>
                  </div>
                </div>
                <div className="text-lg text-primary animate-pulse">
                  {status === "testing-ping" && "Testing Ping..."}
                  {status === "testing-download" && "Testing Download..."}
                  {status === "testing-upload" && "Testing Upload..."}
                </div>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Ping */}
            <div className="backdrop-blur-glass bg-muted/30 border border-border/50 rounded-2xl p-4 text-center hover:bg-muted/40 transition-all duration-300">
              <Wifi className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {ping.toFixed(0)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Ping (ms)</div>
            </div>

            {/* Download */}
            <div className="backdrop-blur-glass bg-muted/30 border border-border/50 rounded-2xl p-4 text-center hover:bg-muted/40 transition-all duration-300">
              <Download className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {downloadSpeed.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Download (Mbps)</div>
            </div>

            {/* Upload */}
            <div className="backdrop-blur-glass bg-muted/30 border border-border/50 rounded-2xl p-4 text-center hover:bg-muted/40 transition-all duration-300">
              <Upload className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {uploadSpeed.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Upload (Mbps)</div>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="backdrop-blur-glass bg-card/20 border border-border/50 rounded-2xl px-6 py-4 max-w-2xl w-full">
          <p className="text-sm text-muted-foreground text-center">
            Your IP: <span className="text-foreground font-mono">192.168.1.1</span> • 
            Server: <span className="text-foreground">New York, US</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

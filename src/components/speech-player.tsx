"use client";

import { Play, Pause, Settings } from "lucide-react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface SpeechPlayerProps {
  text: string;
}

export function SpeechPlayer({ text }: SpeechPlayerProps) {
  const { isSupported, isPlaying, isPaused, speak, pause, resume, voices, selectedVoice, setSelectedVoice, rate, setRate } = useSpeechSynthesis();

  if (!isSupported) {
    return null;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(text);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button onClick={handlePlayPause} size="icon" variant="ghost" className="h-9 w-9">
        {isPlaying && !isPaused ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        <span className="sr-only">{isPlaying && !isPaused ? "Pause" : "Play"}</span>
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost" className="h-9 w-9">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Voice Settings</h4>
              <p className="text-sm text-muted-foreground">Adjust voice and speed.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="voice">Voice</Label>
              <Select
                value={selectedVoice?.name}
                onValueChange={(value) => {
                  const voice = voices.find(v => v.name === value);
                  if (voice) setSelectedVoice(voice);
                }}
                disabled={voices.length === 0}
              >
                <SelectTrigger id="voice">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="rate">Speed ({rate.toFixed(1)}x)</Label>
                <Slider
                    id="rate"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[rate]}
                    onValueChange={(value) => setRate(value[0])}
                />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

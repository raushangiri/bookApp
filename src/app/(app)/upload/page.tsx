
'use client';

import { useState } from 'react';
import { UploadCloud, FileText, Loader2, Volume2, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { summarizePdf, getAudioSummary } from '@/lib/actions';
import { Separator } from '@/components/ui/separator';

type SummaryResult = {
  summary: string;
  audioDataUri?: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
      setError(null);
      setProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const handleSummarize = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setProgress(10);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const pdfDataUri = reader.result as string;
        setProgress(30);
        
        const summaryResult = await summarizePdf({ pdfDataUri });
        setResult({ summary: summaryResult.summary });
        setProgress(70);

        const audioResult = await getAudioSummary({ text: summaryResult.summary });
        setResult(prev => prev ? { ...prev, audioDataUri: audioResult.audioDataUri } : null);
        setProgress(100);

      } catch (e) {
        console.error(e);
        setError('Failed to process the PDF. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
        setIsLoading(false);
    }
  };
  
  const clearFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
  }

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold text-primary mb-2">AI Document Summarizer</h1>
        <p className="text-lg text-muted-foreground font-body">
          Upload a PDF to get a quick summary in text and audio format.
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            {!file ? (
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer
                  ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {isDragActive ? 'Drop the file here...' : "Drag 'n' drop a PDF here, or click to select a file"}
                </p>
                <p className="text-xs text-muted-foreground/80 mt-2">PDF only, max 10MB</p>
              </div>
            ) : (
                <div className='relative p-6 border rounded-lg'>
                    <div className="flex items-center gap-4">
                        <FileText className="h-10 w-10 text-primary" />
                        <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={clearFile}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            )}
            
            {file && (
              <Button onClick={handleSummarize} disabled={isLoading} className="w-full mt-6" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  'Generate Summary'
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {isLoading && (
            <div className="mt-8 space-y-4">
                <Progress value={progress} className="w-full" />
                <p className='text-center text-muted-foreground'>AI is at work. This may take a moment...</p>
            </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-8">
            <FileText className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">{result.summary}</p>
              
              {result.audioDataUri && (
                <>
                    <Separator className='my-6' />
                    <div className="flex items-center gap-4">
                        <h3 className="font-headline text-xl font-bold text-primary/90">
                          Audio Summary
                        </h3>
                        <audio controls src={result.audioDataUri} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </>
              )}

            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

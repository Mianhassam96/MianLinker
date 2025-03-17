import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link as LinkIcon, Copy } from "lucide-react";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
        
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
          duration: 3000,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "Copied!",
      description: "Full URL copied to clipboard",
      duration: 3000,
    });
  };

  const getShortenedUrl = (url: string) => {
    return url.length > 50 ? `${url.substring(0, 47)}...` : url;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#9b87f5] text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wider hover:text-[#1A1F2C] transition-colors duration-300">
            MultiMian
          </h1>
          <div className="text-sm font-medium">
            Image to URL Converter
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-white py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-[#1A1F2C]">
                Image to URL Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <label
                  htmlFor="image-upload"
                  className="w-full max-w-md cursor-pointer"
                >
                  <div className="border-2 border-dashed border-[#9b87f5] rounded-lg p-8 text-center hover:border-[#1A1F2C] hover:bg-purple-50 transition-all duration-300">
                    <Upload className="mx-auto h-12 w-12 text-[#9b87f5]" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>

                {imageUrl && (
                  <div className="w-full space-y-4">
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#9b87f5] shadow-sm">
                      <LinkIcon className="h-4 w-4 text-[#9b87f5] shrink-0" />
                      <div className="truncate flex-1 text-sm">
                        {getShortenedUrl(imageUrl)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className="shrink-0 hover:bg-purple-100"
                        title="Copy full URL"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1F2C] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-wider text-[#9b87f5]">
          ImageLinker
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} MultiMian. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
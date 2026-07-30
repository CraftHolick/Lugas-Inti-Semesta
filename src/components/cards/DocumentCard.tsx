'use client';

import { FileText, File, Sheet, Download } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  icon: string;
}

export function DocumentCard({ title, fileType, fileSize, downloadUrl, icon }: DocumentCardProps) {
  const Icon = icon === 'Sheet' ? Sheet : icon === 'FileText' ? FileText : File;

  return (
    <div className="bg-navy-800 rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:border-white/10 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-text-light truncate">{title}</h4>
        <div className="text-xs text-text-muted mt-1 flex items-center gap-2">
          <span className="uppercase">{fileType}</span>
          <span className="w-1 h-1 rounded-full bg-navy-600"></span>
          <span>{fileSize}</span>
        </div>
      </div>
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 p-2 bg-accent hover:bg-accent-hover text-navy-950 rounded-lg transition-colors flex items-center justify-center"
        aria-label="Download Document"
      >
        <Download className="w-4 h-4" />
      </a>
    </div>
  );
}

import React from 'react';

const FileAttachments = () => {
  const mockFiles = [
    {
      id: 1,
      name: 'Grade_Submission_Q1.xlsx',
      type: 'excel',
      size: '245 KB',
      uploadDate: '2024-03-20 14:30'
    },
    {
      id: 2,
      name: 'Grade_Book_Scan.pdf',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2024-03-20 14:32'
    },
    {
      id: 3,
      name: 'Student_Work_Samples.zip',
      type: 'archive',
      size: '4.7 MB',
      uploadDate: '2024-03-20 14:35'
    }
  ];

  const getFileIcon = (fileType) => {
    const iconClasses = "w-8 h-8";
    
    switch (fileType) {
      case 'excel':
        return <div className={`${iconClasses} text-green-600 i-tabler-file-spreadsheet`} />;
      case 'pdf':
        return <div className={`${iconClasses} text-red-600 i-tabler-file-text`} />;
      case 'archive':
        return <div className={`${iconClasses} text-amber-600 i-tabler-file-zip`} />;
      default:
        return <div className={`${iconClasses} text-gray-600 i-tabler-file`} />;
    }
  };

  const handleDownload = (file) => {
    // Remove the alert - just handle download silently
    console.log(`Downloading ${file.name}`);
    // Add actual download logic here if needed
  };

  const handlePreview = (file) => {
    // Remove the alert - just handle preview silently
    console.log(`Opening preview for ${file.name}`);
    // Add actual preview logic here if needed
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Submitted Files
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Review all attached grade files and documents submitted by the teacher.
        </p>
        
        <div className="space-y-3">
          {mockFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600">
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {file.size} • Uploaded {file.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(file)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Preview
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => handleDownload(file)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileAttachments;
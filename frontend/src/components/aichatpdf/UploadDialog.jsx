import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Input,
} from '@mui/material';

const UploadDialog = ({
  open,
  onClose,
  onFileChange,
  onDrag,
  onDrop,
  onUpload,
  dragActive,
  selectedFile,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload PDF</DialogTitle>
      <DialogContent>
        <Box
          onDragEnter={onDrag}
          onDragOver={onDrag}
          onDragLeave={onDrag}
          onDrop={onDrop}
          sx={{
            border: '2px dashed',
            borderColor: dragActive ? 'primary.main' : 'grey.400',
            borderRadius: 2,
            padding: 4,
            textAlign: 'center',
            bgcolor: dragActive ? 'primary.light' : 'transparent',
            transition: '0.3s',
          }}
        >
          {selectedFile ? (
            <Typography variant="body1">{selectedFile.name}</Typography>
          ) : (
            <div className="border bg-gray-100 rounded-md p-2">
              <input type="file" accept="application/pdf" onChange={onFileChange} />
              <Typography variant="caption" display="block" mt={1}>
                Max file size: 10MB
              </Typography>
            </div>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onUpload} disabled={!selectedFile} variant="contained">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;

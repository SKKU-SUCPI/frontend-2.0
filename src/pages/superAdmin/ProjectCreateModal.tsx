import React, { useState } from 'react';
import axiosInstance from '@/apis/utils/axiosInterceptor';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, Typography 
} from '@mui/material';

interface ProjectCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({ open, onClose, onSuccess }) => {
  const [projectName, setProjectName] = useState("");
  const [multiplier, setMultiplier] = useState<number | "">(1.0);

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      alert("프로젝트 이름을 입력해주세요.");
      return;
    }

    const finalMultiplier = Number(multiplier);
    if (isNaN(finalMultiplier) || finalMultiplier <= 0) {
      alert("유효한 배수를 입력해주세요 (예: 1.0).");
      return;
    }

    try {
      const payload = {
        projectName: projectName.trim(),
        multiplier: finalMultiplier
      };

      await axiosInstance.post('/super-admin/projects', payload);
      
      alert("프로젝트가 성공적으로 생성되었습니다.");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Project creation failed", error);
      alert("프로젝트 생성 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    setProjectName("");
    setMultiplier(1.0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>새 프로젝트 생성</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField
            label="프로젝트 이름"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          
          <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              프로젝트 전체 배수 (Multiplier)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              이 프로젝트의 점수 계산 시 곱해지는 일괄 배수입니다. (기본값: 1.0)
            </Typography>
            <TextField
              label="배수"
              type="number"
              inputProps={{ step: "0.1", min: "0" }}
              fullWidth
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClose} 
          sx={{ 
            color: '#666', 
            border: '1px solid #e0e0e0',
            backgroundColor: '#f5f5f5',
            padding: '8px 24px',
            '&:hover': { backgroundColor: '#e8e8e8' }
          }}
        >
          취소
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{ 
            backgroundColor: '#4caf50', 
            color: 'white',
            padding: '8px 24px',
            '&:hover': { backgroundColor: '#45a049' }
          }}
        >
          생성
        </Button>
      </DialogActions>
    </Dialog>
  );
};
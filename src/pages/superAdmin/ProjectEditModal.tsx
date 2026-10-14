import React, { useState, useEffect } from 'react';
import axiosInstance from '@/apis/utils/axiosInterceptor';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, Typography 
} from '@mui/material';

interface Project {
  id?: number;
  projectId?: number;
  projectName: string;
  multiplier: number;
  startDate?: string;
  endDate?: string;
}

interface ProjectEditModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project: Project | null;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ open, onClose, onSuccess, project }) => {
  const [projectName, setProjectName] = useState(project?.projectName || "");
  const [multiplier, setMultiplier] = useState<number | "">(1.0);
  const [startDate, setStartDate] = useState(project?.startDate || "");
  const [endDate, setEndDate] = useState(project?.endDate || "");

  useEffect(() => {
    if (open && project) {
      setProjectName(project.projectName || "");
      setMultiplier(project.multiplier ?? 1.0);
      setStartDate(project.startDate || "");
      setEndDate(project.endDate || "");
    }
  }, [project, open]);

  const handleSubmit = async () => {
    if (!project) return;

    const targetId = project.id || project.projectId;
    if (!targetId) {
      alert("프로젝트 ID를 찾을 수 없습니다.");
      return;
    }

    if (!projectName.trim()) {
      alert("프로젝트 이름을 입력해주세요.");
      return;
    }

    const finalMultiplier = Number(multiplier);
    if (isNaN(finalMultiplier) || finalMultiplier <= 0) {
      alert("유효한 배수를 입력해주세요 (예: 1.0).");
      return;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        alert("종료일은 시작일보다 빠를 수 없습니다.");
        return;
      }
    }

    try {
      const payload = {
        projectName: projectName.trim(),
        multiplier: finalMultiplier,
        startDate: startDate || null,
        endDate: endDate || null
      };

      await axiosInstance.put(`/super-admin/projects/${targetId}`, payload); 
      
      alert("프로젝트가 성공적으로 수정되었습니다.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Project update failed", error);
      alert("프로젝트 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>프로젝트 수정</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField
            label="프로젝트 이름"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="시작일"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="종료일"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          
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
          onClick={onClose} 
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
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};
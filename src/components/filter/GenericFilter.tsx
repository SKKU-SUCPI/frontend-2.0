import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Badge from "@/pages/admin/activiy/list/components/Badge";

const badgeColorSet = {
  background: "#f5f5f5",
  font: "#222",
};

const GenericFilter = ({
  filterConfig,
  filters,
  onFilterChange,
  onReset,
  onApply,
  appliedFilter,
  filterShow = false,
}: any) => {
  // 필터 입력 필드 렌더링
  const renderFilterField = (config: any) => {
    const { id, type, label, options, placeholder, width } = config;

    switch (type) {
      case "text":
        return (
          <TextField
            key={id}
            label={label}
            size="small"
            value={filters[id] || ""}
            onChange={(e) => onFilterChange(id, e.target.value || null)}
            placeholder={placeholder || `${label}을 입력하세요`}
            sx={{ width: width || 160 }}
          />
        );

      case "select":
        return (
          <FormControl key={id} size="small" sx={{ minWidth: width || 110 }}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={filters[id] === null ? "ALL" : filters[id]}
              label={label}
              onChange={(e) => {
                // "ALL"이면 null로, 아니면 원래 값 사용
                const value = e.target.value === "ALL" ? null : e.target.value;
                onFilterChange(id, value);
              }}
            >
              {options.map((option: any, index: number) => (
                <MenuItem
                  key={option.id !== null ? option.id : `null-${index}`}
                  value={option.id === null ? "ALL" : option.id}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "date":
        return (
          <TextField
            key={id}
            label={label}
            type="date"
            size="small"
            value={filters[id] || ""}
            onChange={(e) => onFilterChange(id, e.target.value || null)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: width || 160 }}
          />
        );

      default:
        return null;
    }
  };

  // Badge 표시용 값 변환 함수
  const getBadgeLabel = (config: any, value: any) => {
    const { type, options } = config;

    if (value === null || value === "" || value === undefined) return null;

    switch (type) {
      case "text":
        return value;

      case "select":
        const selectOption = options.find((opt: any) => opt.id === value);
        return selectOption ? selectOption.label : value;

      case "date":
        return value;

      default:
        return value;
    }
  };

  const hasFilter = () => {
    return filterConfig.some((config: any) => {
      const value = appliedFilter[config.id];
      return value !== null && value !== "" && value !== config.defaultValue;
    });
  };

  // Badge 표시 여부 확인
  const shouldShowBadge = (config: any, value: any) => {
    return value !== null && value !== "" && value !== config.defaultValue;
  };

  return (
    <Box sx={{ margin: "10px 0" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 2,
        }}
      >
        {/* 왼쪽 그룹 - 필터 입력 필드들 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {filterConfig.map((config: any) => renderFilterField(config))}
        </Box>

        {/* 가운데 적용된 필터 Badge */}
        {filterShow && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flex: 1,
              minWidth: 0,
              overflowX: "auto",
              whiteSpace: "nowrap",
              justifyContent: "center",
            }}
          >
            {hasFilter() && (
              <Stack direction="row" spacing={1} alignItems="center">
                <span style={{ color: "#222", fontWeight: 500 }}>
                  적용된 필터:
                </span>
                {filterConfig.map((config: any) => {
                  const value = appliedFilter[config.id];
                  if (!shouldShowBadge(config, value)) return null;

                  const label = getBadgeLabel(config, value);
                  return label ? (
                    <Badge
                      key={config.id}
                      label={label}
                      colors={badgeColorSet}
                      fontSize={13}
                    />
                  ) : null;
                })}
              </Stack>
            )}
          </Box>
        )}

        {/* 오른쪽 아이콘 버튼 그룹 */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="적용" arrow>
            <IconButton
              onClick={onApply}
              sx={{
                minWidth: 40,
                minHeight: 40,
                background: "#222",
                color: "#fff",
                borderRadius: 0,
                "&:hover": { background: "#111" },
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="초기화" arrow>
            <IconButton
              onClick={onReset}
              sx={{
                minWidth: 40,
                minHeight: 40,
                background: "#fff",
                color: "#222",
                border: "1px solid #222",
                borderRadius: 0,
                "&:hover": { background: "#f5f5f5", color: "#111" },
              }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default GenericFilter;

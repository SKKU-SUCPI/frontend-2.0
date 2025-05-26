import { useAdminStudents } from "@/hooks/admin/useAdminStudents";

const TestPage = () => {
  const { data, isLoading, error } = useAdminStudents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default TestPage;

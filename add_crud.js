const fs = require('fs');
let hookCode = fs.readFileSync('D:/Websites/MAMASSAMPIZZATIME/hooks/use-admin.ts', 'utf8');

if (!hookCode.includes('useAdminData(')) {
  hookCode += `

export function useAdminData(tableName: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
    if (!error && result) {
      setData(result);
    } else {
      console.error(error);
    }
    setLoading(false);
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveData = async (item: any) => {
    if (item.id) {
      const { id, ...rest } = item;
      await supabase.from(tableName).update(rest).eq('id', id);
    } else {
      await supabase.from(tableName).insert([item]);
    }
    fetchData();
  };

  const deleteData = async (id: string) => {
    await supabase.from(tableName).delete().eq('id', id);
    fetchData();
  };

  return { data, loading, saveData, deleteData };
}
`;
  fs.writeFileSync('D:/Websites/MAMASSAMPIZZATIME/hooks/use-admin.ts', hookCode);
  console.log('Added useAdminData hook!');
}

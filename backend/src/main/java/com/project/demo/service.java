@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository repo;

    public List<Employee> listAll() { return repo.findAll(); }
    public Employee save(Employee emp) { return repo.save(emp); }
    public void delete(Long id) { repo.deleteById(id); }
    public Optional<Employee> get(Long id) { return repo.findById(id); }
}

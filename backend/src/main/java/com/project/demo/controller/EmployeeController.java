@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping
    public List<Employee> getAll() {
        return service.listAll();
    }

    @PostMapping
    public Employee create(@RequestBody Employee emp) {
        return service.save(emp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> get(@PathVariable Long id) {
        return service.get(id).map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee emp) {
        return service.get(id).map(existing -> {
            existing.setName(emp.getName());
            existing.setEmail(emp.getEmail());
            existing.setDepartment(emp.getDepartment());
            existing.setSalary(emp.getSalary());
            return ResponseEntity.ok(service.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

const sortByOpt = document.getElementById('sort-by')
const rolesTable = document.getElementById('roles')
const employeesField = document.getElementById('employees-field')

function createTd(value) {
  const td = document.createElement('td')
  td.id = value
  td.textContent = value
  return td
}

function appendRoles(roles) {
  for (r of roles) {
    const divRole = document.createElement('div')
    divRole.classList.add('role')

    const label = document.createElement('label')
    label.htmlFor = r.id
    label.textContent = r.name

    const input = document.createElement('input')
    input.id = r.id
    input.type = 'checkbox'

    divRole.appendChild(input)
    divRole.appendChild(label)
    rolesTable.appendChild(divRole)
  }
}

function appendEmployees(employees, roles) {
  for (e of employees) {
    if (employeesField.children.length < 23) {
      const tr = document.createElement('tr')
      const { id, name, role_id, salary } = e

      const idField = createTd(id)
      const nameField = createTd(name)
      const roleField = createTd(role_id)
      const salaryField = createTd(salary)

      const roleName = roles.filter((r) => r.id === role_id)
      roleField.textContent = roleName[0].name

      tr.classList.add('employee')
      tr.appendChild(idField)
      tr.appendChild(nameField)
      tr.appendChild(roleField)
      tr.appendChild(salaryField)
      employeesField.appendChild(tr)
    }
  }
}

function render(roles, employees) {
  rolesTable.textContent = ''
  employeesField.textContent = ''
  appendRoles(roles)
  appendEmployees(employees, roles)
}

async function init() {
  let [employees, roles] = await getData()

  sortByOpt.addEventListener('change', (e) => {
    let sortedEmployees
    switch (e.target.value) {
      case 'nameAs':
        sortedEmployees = employees.sort((a, b) => {
          return a.name < b.name ? -1 : 0
        })
        render(roles, employees)
        break
      case 'nameDes':
        sortedEmployees = employees.sort((a, b) => {
          return a.name > b.name ? -1 : 0
        })
        render(roles, employees)
        break
      case 'salaryAs':
        sortedEmployees = employees.sort((a, b) => {
          return Number(a.salary) < Number(b.salary) ? -1 : 0
        })
        render(roles, sortedEmployees)
        break
      case 'salaryDes':
        sortedEmployees = employees.sort((a, b) => {
          return Number(a.salary) > Number(b.salary) ? -1 : 0
        })
        render(roles, sortedEmployees)
        break
      default:
        break
    }
  })

  render(roles, employees)
}

init()

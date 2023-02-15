import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import styles from "../styles/EmployeeList.module.css";
import axios from "axios";
function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deleteEmployee = async (id) => {
    let data = await axios.delete(`http://localhost:3000/api/employee/${id}`);
    router.push("/");
  };
  return (
    // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <div className={styles.cols}>
      <table className="table table-striped-columns">
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>EmployeeId</th>
            <th className={styles.th}>EmployeeName</th>
            <th className={styles.th}>EmployeeEmail</th>
            <th className={styles.th}>EmployeeAddress</th>
            <th className={styles.th}>EmployeePhone</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((empData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{empData.emp_name}</td>
              <td className={styles.th}>{empData.emp_email}</td>
              <td className={styles.th}>{empData.emp_address}</td>
              <td className={styles.th}>{empData.emp_phone}</td>
              <td className={styles.btn__cols}>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(empData.emp_id)}
                >
                  Delete
                </button>
                <button className={styles.update}>
                  <Link href={`/employee/${empData.emp_id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addEmployeeCenter}>
        <button className={styles.addEmployee}>
          <Link href={`employee/addEmployee`}>AddEmployee</Link>
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/employee");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Home;

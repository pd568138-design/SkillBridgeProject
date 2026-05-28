import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [coins, setCoins] = useState(0);
  const [activities, setActivities] = useState([]);

  // USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // PROFILE
  const profile = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("profileData") || "{}"
      );
    } catch {
      return {};
    }
  })();

  // LOAD DATA
  useEffect(() => {

    const loadData = () => {

      // TASKS
      const allTasks =
        JSON.parse(
          localStorage.getItem("tasks")
        ) || [];

      // ONLY CURRENT USER TASKS
      const userTasks =
        allTasks.filter(
          (item)=>
            item.userEmail === user?.email
        );

      setTasks(userTasks);

      // COINS
      const savedCoins =
        Number(
          localStorage.getItem("coins")
        ) || 0;

      setCoins(savedCoins);

      // ACTIVITY
      const allActivity =
        JSON.parse(
          localStorage.getItem("recentActivity")
        ) || [];

      const userActivity =
        allActivity.filter(
          (item)=>
            item.userEmail === user?.email
        );

      setActivities(userActivity);

    };

    loadData();

    // LIVE UPDATE
    const interval = setInterval(() => {

      loadData();

    }, 500);

    return () => clearInterval(interval);

  }, []);

  // STATS
  const completed =
    tasks.filter(
      (t)=>t.completed === true
    ).length;

  const inProgress =
    tasks.filter(
      (t)=>t.completed === false
    ).length;

  return(

    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* HEADER */}
        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"20px",
            background:"#eef2ff",
            borderRadius:"12px",
            marginBottom:"20px"
          }}
        >

          <h2 style={{color:"#1e3a8a"}}>

            Hello {user?.name || "Student"} 👋

          </h2>

          <div
            style={{
              background:"#1e3a8a",
              color:"white",
              padding:"10px 16px",
              borderRadius:"10px"
            }}
          >

            🪙 {coins}

          </div>

        </div>

        {/* STATS */}
        <div className="stats-row">

          <div className="mini-card">

            <h3>Total Challenges</h3>

            <p>{tasks.length}</p>

          </div>

          <div className="mini-card">

            <h3>Completed</h3>

            <p>{completed}</p>

          </div>

          <div className="mini-card">

            <h3>In Progress</h3>

            <p>{inProgress}</p>

          </div>

        </div>

        {/* SKILLS */}
        <div className="dashboard-card-large">

          <h2>Skills Overview</h2>

          <div className="skills">

            {
              ["React","DSA","Java","Python"]
              .map((s)=>(

                <span key={s}>
                  {s}
                </span>

              ))
            }

          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="dashboard-card-large">

          <h2>Recent Activity</h2>

          {
            activities.length === 0 ? (

              <p>
                No activity yet
              </p>

            ) : (

              activities
              .slice(-5)
              .reverse()
              .map((item,i)=>(

                <div
                  key={i}
                  style={{
                    padding:"10px",
                    margin:"8px 0",
                    borderLeft:"4px solid #1e3a8a",
                    background:"#f8fafc",
                    borderRadius:"8px"
                  }}
                >

                  <h3>
                    {item.name}
                  </h3>

                  <p>

                    📚 Skill:
                    {" "}
                    {item.skill}

                  </p>

                  <p>

                    🪙 Coins:
                    {" "}
                    {item.coins}

                  </p>

                  <p>

                    ✅ Status:
                    {" "}
                    {item.status}

                  </p>

                  <p>

                    🕒
                    {" "}
                    {item.date}

                  </p>

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
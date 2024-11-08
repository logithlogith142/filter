import "./App.css";
import bmw from "./bmw.png";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { LiaRupeeSignSolid, LiaLaptopSolid } from "react-icons/lia";
import { BiSolidCategory } from "react-icons/bi";
import { FaMobileAlt, FaHome, FaSearch } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuCopyright } from "react-icons/lu";
import {
  GiFragrance,
  GiBallGlow,
  GiJellyBeans,
  GiWoodFrame,
} from "react-icons/gi";

export default function App() {
  const [data, setdata] = useState([]);
  const [category, setcategory] = useState([]);

  const get = async (t) => {
    const res = await axios.get("/data.json");

    setdata(res.data);
    setcategory(res.data);
  };
  const icons = [
    <FaHome />,
    <FaMobileAlt />,
    <LiaLaptopSolid />,
    <GiFragrance />,
    <GiBallGlow />,
    <GiJellyBeans />,
    <GiWoodFrame />,
  ];
  const cat1 = ["all", ...new Set(data.map((i) => i.category))];

  useEffect(() => {
    get();
  }, []);
  const filter = (t) => {
    console.log(t);

    if (t === "all") {
      setcategory(data);
    } else {
      const f = data.filter((i) => i.category === t);
      setcategory(f);
      console.log(f);
    }
  };
  const search = (s) => {
    console.log(s.trim());
    const s1 = data.filter((l) => l.title.toLowerCase().includes(s));
    setcategory(s1);
  };
  return (
    <div className="container">
      <div className="side">
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <span id="span">
            <MdOutlineProductionQuantityLimits style={{}} />
          </span>
          <h3 style={{ fontSize: 30 }}>
            <span style={{ fontSize: 40, color: "#e4a41c" }}>U</span>rban
            <span style={{ fontSize: 40, color: "#e4a41c" }}>N</span>est
          </h3>
        </div>
        <div className="brand">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              marginLeft: 20,
            }}
          >
            {" "}
            <span style={{ fontSize: 30, paddingTop: 27 }}>
              <BiSolidCategory />
            </span>{" "}
            <h1 style={{}}>Category</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <span style={{ fontSize: 25, paddingTop: 5 }}>
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search"
              id="search"
              onChange={(e) => search(e.target.value.toLowerCase())}
            />
          </div>
          {cat1.map((d, i) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 25,
                marginTop: 20,
                borderRadius: 20,
              }}
              className="category"
            >
              <span
                style={{
                  paddingTop: 22,
                  marginLeft: 40,
                  fontSize: 20,
                }}
              >
                {icons[i]}
              </span>{" "}
              <h4
                key={i}
                style={{ letterSpacing: 1 }}
                onClick={(e) => {
                  filter(e.target.textContent);
                }}
              >
                {d}
              </h4>
            </div>
          ))}
        </div>
      </div>

      <div className="products">
        {category.length === 0 ? (
          <h3 id="not">products not found!!!</h3>
        ) : (
          category.map((d) => (
            <div className="product" key={d.id}>
              <div className="img">
                <img src={d.thumbnail} />
              </div>
              <div className="content">
                <h3>{d.title}</h3>
                <p> {d.brand}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  {" "}
                  <h5 style={{ color: "#3c7fd2" }}>
                    Price : <span style={{ color: "#333333" }}>{d.price}</span>
                  </h5>
                  <span style={{ fontSize: 15, paddingTop: 22 }}>
                    <LiaRupeeSignSolid />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="footer">
          <span>
            <LuCopyright />
          </span>
          <h5>Copyrights - 2024 Made by - Myvizhi R</h5>
        </div>
      </div>
    </div>
  );
}

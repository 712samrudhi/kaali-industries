import React from "react";
import { useSearchParams, Link } from "react-router-dom";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // ⚠️ हा फक्त उदाहरण data आहे — तुमचा actual products/services 
  // data (array किंवा API) इथे वापरायचा आहे
  const allItems = [
    { id: 1, name: "Wheat Seeds", category: "Seeds" },
    { id: 2, name: "Fertilizer NPK", category: "Fertilizer" },
    { id: 3, name: "Tractor Service", category: "Services" },
    { id: 4, name: "Organic Pesticide", category: "Pesticide" },
  ];

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <style>{`
        .search-results-container{
          padding: 40px 5%;
          min-height: 60vh;
        }

        .search-heading{
          font-size: 22px;
          margin-bottom: 25px;
          color: #333;
        }

        .search-heading span{
          color: #16a34a;
        }

        .results-grid{
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .result-card{
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: 0.3s;
        }

        .result-card:hover{
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }

        .result-card h3{
          font-size: 18px;
          color: #0f766e;
          margin-bottom: 8px;
        }

        .result-card p{
          font-size: 14px;
          color: #666;
        }

        .no-results{
          text-align: center;
          color: #888;
          font-size: 16px;
          margin-top: 50px;
        }
      `}</style>

      <div className="search-results-container">
        <h2 className="search-heading">
          Search Results for: <span>"{query}"</span>
        </h2>

        {filteredItems.length > 0 ? (
          <div className="results-grid">
            {filteredItems.map((item) => (
              <div className="result-card" key={item.id}>
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">
            कोणतेही परिणाम सापडले नाहीत. कृपया वेगळा शब्द वापरून पहा.
          </p>
        )}
      </div>
    </>
  );
}

export default SearchResults;
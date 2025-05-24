"use client"

import "../styles/CardResumo.css"
import { ArrowUp, ArrowDown } from "lucide-react"

const CardResumo = ({ icon, title, value, trend, trendValue, color, vertical = false }) => {
  return (
    <div className={`card-resumo card-${color} ${vertical ? "card-vertical" : ""}`}>
      {vertical ? (
        <>
          <div className="card-main">
            <div className="card-info">
              <h3 className="card-value">{value}</h3>
              <p className="card-title">{title}</p>
              {trendValue && (
                <div className={`card-trend ${trend === "up" ? "trend-up" : "trend-down"}`}>
                  {trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            <div className="card-icon-right">{icon}</div>
          </div>
        </>
      ) : (
        <>
          <div className="card-content">
            <h3 className="card-value">{value}</h3>
            <p className="card-title">{title}</p>
            {trendValue && (
              <div className={`card-trend ${trend === "up" ? "trend-up" : "trend-down"}`}>
                {trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className="card-icon">{icon}</div>
        </>
      )}
    </div>
  )
}

export default CardResumo



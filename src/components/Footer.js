import React from "react";
import { Container } from "react-bootstrap";
import "../styles/layout.css";

const Footer = () => {
  return (
    <footer id="ft" className="bg-dark text-white py-3">
      <div>
        <Container className="d-flex justify-content-between align-items-center">
          <div className="text-start list-inline-item">
            <ul className="list-inline">
              <li className="list-inline-item">
                🚀 Powered by{" "}
                <a href="https://pokeapi.co/" target="_blank" className="text-warning">
                  PokéAPI
                </a>
              </li>
              <li className="list-inline-item">|</li>
              <li className="list-inline-item">© 2025 My-PokéMon Project by{" "}
              <a href="https://github.com/kkdh0130" className="text-warning">
                Dahyun
              </a></li>
            </ul>
          </div>
          <ul className="list-inline d-flex">
            <li className="list-inline-item">
              <a href="https://github.com/kkdh0130" target="_blank">
                <img
                  src="/icons/github.png"
                  alt="GitHub"
                  width="40"
                  height="40"
                  className="icon-img"
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" target="_blank">
                <img
                  src="/icons/notion.svg"
                  alt="Notion"
                  width="40"
                  height="40"
                  className="icon-img"
                />
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import { Photo } from "services/photo-grid";
import { config } from "../config";
import "./App.css";
import PhotoGrid from "./PhotoGrid";

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch(config.photosUrl)
      .then((res) => res.json())
      .then((result) => {
        setPhotos(result.photos);
      });
  }, []);

  return (
    <div className="app">
      <Grid className="header">
        <Row>
          <Col md={12}>
            <h1>Photo Gallery</h1>
            <p className="info-text">
              All the photos on this page are taken by me. Feel free to use
              these photos in any way you need.
            </p>
          </Col>
        </Row>
      </Grid>
      <PhotoGrid photos={photos} />
    </div>
  );
};

export default App;

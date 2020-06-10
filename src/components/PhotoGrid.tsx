import * as React from "react";
import { useMemo, useState } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import Carousel, { Modal, ModalGateway } from "react-images";
import { getPhotoIndex, getPhotoRows, Photo } from "../services/photo-grid";
import "./PhotoGrid.css";

interface Props {
  photos: Photo[];
}

const PhotoGrid: React.FC<Props> = ({ photos }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [carouselImageIndex, setCarouselImageIndex] = useState<number>(0);

  const openModal = (index: number) => () => {
    setModalOpen(true);
    setCarouselImageIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const photoRows = useMemo(() => getPhotoRows(photos), [photos]);

  return (
    <div>
      <Grid>
        {photoRows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((photo, colIndex) => {
              const photoIndex = getPhotoIndex(rowIndex, colIndex);

              return (
                <Col
                  key={photoIndex}
                  md={4}
                  className="image-col"
                  onClick={openModal(photoIndex)}
                >
                  <img src={photo.source.thumbnail} />
                </Col>
              );
            })}
          </Row>
        ))}
      </Grid>
      <ModalGateway>
        {isModalOpen ? (
          <Modal onClose={closeModal} allowFullscreen={false}>
            <Carousel currentIndex={carouselImageIndex} views={photos} />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default PhotoGrid;

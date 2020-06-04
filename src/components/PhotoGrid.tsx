import { chunk } from "lodash";
import * as React from "react";
import { useMemo, useState } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import Carousel, { Modal, ModalGateway } from "react-images";
import "./PhotoGrid.css";

interface Props {
  photos: Photo[];
}

export interface Photo {
  caption: string;
  source: {
    regular: string;
    thumbnail: string;
  };
}

const ROW_COL_COUNT = 3;

const getPhotoIndex = (rowIndex: number, colIndex: number) =>
  colIndex + rowIndex * ROW_COL_COUNT;

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

  const photoRows = useMemo(() => chunk(photos, ROW_COL_COUNT), [photos]);

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

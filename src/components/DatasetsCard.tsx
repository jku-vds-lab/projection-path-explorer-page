import { tagToCategoryEnum, categoryToColorEnum } from '../modules/Tags';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import '../styles/DatasetCard.css';

interface IDatasetCardProps {
  datasetInfo: IDatasetInfo
}

interface IDatasetInfo {
  name: string;
  domain: string;
  id: string;
  type: string;
  primaryDescription: string;
  secondaryDescription: string;
  tags: string[];
  imagePath: string;
  datasetLinks?: {};
}


function DatasetsCard(props: IDatasetCardProps) {
  const [collapseButton, setcollapseButton] = useState("Show more");
  const datasetImage = require(`../assets/datasetImages/${props.datasetInfo.imagePath}`);
  const [pseLinks, setPseLinks] = useState<any[]>();
  const [specialLinks, setSpecialLinks] = useState<any[]>();

  useEffect(() => {
    if (props.datasetInfo.datasetLinks) {
      const linkArray = Object.entries(props.datasetInfo.datasetLinks);
      const specialLinks = linkArray.filter(([key, value]) => {
        return (key === "Data files" || key === "paper link")
      });
      const normalLinks = linkArray.filter(([key, value]) => {
        return !(key === "Data files" || key === "paper link")
      });
      setPseLinks(normalLinks)
      setSpecialLinks(specialLinks)
    }
  }, [props.datasetInfo.datasetLinks])

  return (
    <div className="col">
      <div className="card dataset-card mb-5">
        <img src={datasetImage} alt={props.datasetInfo.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{props.datasetInfo.name}</h5>
          <p className="card-text mb-0">{props.datasetInfo.primaryDescription}</p>
          <p className="card-text collapse mb-0" id={`description-${props.datasetInfo.id}`}>{props.datasetInfo.secondaryDescription}</p>
          <button id={`collapseButton-${props.datasetInfo.id}`} className="show-button btn btn-outline btn-sm mt-3 mb-3" data-bs-toggle="collapse" data-bs-target={`#description-${props.datasetInfo.id}`} aria-expanded="false" aria-controls={`description-${props.datasetInfo.id}`}
            onClick={() => {
              if (document.getElementById(`collapseButton-${props.datasetInfo.id}`)?.classList.contains("collapsed")) {
                setcollapseButton("Show more")
              } else {
                setcollapseButton("Show less")
              }
            }}>
            {collapseButton}
          </button>
          <div className="mb-3">

            <div className='mb-2'>
              {specialLinks &&
                specialLinks?.map(([key, value]) => {
                  if (key === 'Data files') {
                    return (<a key={key} href={String(value)} className="card-link">
                      <FontAwesomeIcon icon={faGithub} size="lg" style={{color: "#495057"}} />
                    </a>)
                  }
                  else {
                    return (<a key={key} href={String(value)} className="card-link">
                      <FontAwesomeIcon icon={faBook} size="lg" style={{color: "#495057"}} />
                    </a>)
                  }
                }
                )}
            </div>
            {pseLinks &&
              pseLinks?.map(([key, value]) => (<a key={key} href={String(value)} className="card-link link-primary">{key}</a>))}
          </div>

          <div>
            {props.datasetInfo.tags.map((tag: string, idx: number) => <span key={idx} className={`badge rounded-pill me-2 bg-${categoryToColorEnum[tagToCategoryEnum[tag as keyof typeof tagToCategoryEnum]]} ${categoryToColorEnum[tagToCategoryEnum[tag as keyof typeof tagToCategoryEnum]] === 'light' ? "text-dark" : ""}`} >{tag}</span>)}
          </div>
        </div>
      </div>
    </div>

  );
}

export default DatasetsCard;

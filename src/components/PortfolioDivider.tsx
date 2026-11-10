export function PortfolioDivider() {
  return (
    <div className="portfolio-divider" aria-hidden="true">
      {['cream', 'olive'].map(tone => (
        <div key={tone} className="portfolio-divider-row" data-tone={tone}>
          <div className="portfolio-divider-track" data-moving>
            {[0, 1].map(copy => (
              <div key={copy} className="portfolio-divider-group">
                {Array.from({ length: 16 }, (_, index) => (
                  <span key={index} className="portfolio-divider-item">
                    FERN
                    {index % 2 === 0
                      ? <span className="portfolio-divider-star">&#10022;</span>
                      : <span className="portfolio-divider-fern" />}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  salePrice: number | null;
  originalPrice: number
}

export default function Price({ salePrice, originalPrice }: Props): JSX.Element {
  return (
    <div className="vinyl__price">
        {salePrice ? (
          <>
            <span className="vinyl__price--normal">${originalPrice.toFixed(2)}</span>
            ${salePrice.toFixed(2)}
          </>
        ) : (
          <>
          ${originalPrice.toFixed(2)}
          </>
        )}
    </div>
  )
}
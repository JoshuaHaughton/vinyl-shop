import { VinylType } from "../../types";

export const filterVinyls = (
  filter: string,
  setFilterState: React.Dispatch<React.SetStateAction<string>>,
  setDisplayedVinyls: React.Dispatch<React.SetStateAction<VinylType[]>>,
  displayedVinyls: VinylType[],
) => {
  console.log(filter);
  setFilterState(filter);
  if (filter === "LOW_TO_HIGH") {
    setDisplayedVinyls(
      displayedVinyls
        .slice()
        .sort(
          (a: any, b: any) =>
            (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice),
        ),
    );
  }

  if (filter === "HIGH_TO_LOW") {
    setFilterState(filter);
    setDisplayedVinyls(
      displayedVinyls
        .slice()
        .sort(
          (a, b) =>
            (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice),
        ),
    );
  }

  if (filter === "RATING") {
    setFilterState(filter);
    setDisplayedVinyls(
      displayedVinyls.slice().sort((a, b) => b.rating - a.rating),
    );
  }
};

export const filterVinylGenres = (
  filter: string,
  setFilterState: React.Dispatch<React.SetStateAction<string>>,
  setDisplayedVinyls: React.Dispatch<React.SetStateAction<VinylType[]>>,
  vinyls: VinylType[]
) => {
  setFilterState("DEFAULT");
  if (filter === "POP") {
    setDisplayedVinyls(vinyls.slice().filter((a) => a.genres.includes("Pop")));
  }

  if (filter === "INDIE") {
    setDisplayedVinyls(
      vinyls.slice().filter((a) => a.genres.includes("Alternative/Indie")),
    );
  }

  if (filter === "RAP") {
    setDisplayedVinyls(
      vinyls.slice().filter((a) => a.genres.includes("Hip-Hop/Rap")),
    );
  }

  if (filter === "R&B") {
    setDisplayedVinyls(
      vinyls.slice().filter((a) => a.genres.includes("R&B/Soul")),
    );
  }

  if (filter === "AFROBEATS") {
    setDisplayedVinyls(
      vinyls.slice().filter((a) => a.genres.includes("Afrobeats")),
    );
  }

  if (filter === "ALL") {
    setDisplayedVinyls(vinyls.slice());
  }
};

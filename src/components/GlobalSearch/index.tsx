import algoliasearch from "algoliasearch";
import { useEffect } from "react";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { integrations, messages } from "../../../integrations.config";
import CustomHits from "./CustomHits";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX as string;

const algoliaClient = algoliasearch(APP_ID, API_KEY);

type Props = {
  searchModalOpen: boolean;
  setSearchModalOpen: (value: boolean) => void;
};

const GlobalSearchModal = (props: Props) => {
  const { searchModalOpen, setSearchModalOpen } = props;

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event: any) {
      if (!event.target.closest(".modal-content")) {
        setSearchModalOpen(false);
      }
    }

    if (searchModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  return (
    <div className="z-99999! backdrop-blur-xs fixed left-0 top-0 flex h-full min-h-screen w-full justify-center bg-[rgba(0,0,0,0.25)] px-4 py-[12vh]">
      <div className="modal-content relative w-full max-w-[600px] overflow-hidden rounded-xl border border-stroke bg-white shadow-xl">
        <InstantSearch
          // insights={false}
          searchClient={algoliaClient}
          indexName={INDEX}
        >
          <SearchBox
            placeholder="Search Entire Site | Products, Docs, Pages ..."
            classNames={{
              form: "sticky top-0 z-999 border-b border-stroke bg-white",
              input:
                "h-[74px] w-full rounded-t-lg bg-white pl-[60px] pr-5 text-dark outline-hidden",
              submitIcon:
                "absolute left-0 top-0 flex h-[74px] w-[60px] p-5 items-center justify-center fill-current",
              reset: "hidden",
              resetIcon: "hidden",
              loadingIndicator: "hidden",
              loadingIcon: "hidden",
            }}
          />

          <div className="max-h-full overflow-y-auto">
            {integrations?.isAlgoliaEnabled ? (
              <Hits
                hitComponent={(props) => (
                  <CustomHits
                    {...props}
                    setSearchModalOpen={setSearchModalOpen}
                  />
                )}
              />
            ) : (
              messages?.algolia
            )}
          </div>
        </InstantSearch>
      </div>
    </div>
  );
};

export default GlobalSearchModal;

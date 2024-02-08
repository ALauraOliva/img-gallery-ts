import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./App.css";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { ImageGallery } from "./types/global.types";
import { useState } from "react";
import { initialImageData } from "./data";

function App() {
  const [galleryData, setgalleryData] = useState(initialImageData);
  const [activeItem, setactiveItem] = useState<ImageGallery | null>(null);
  //dnd code starts here
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;
    if (!id) return;

    //current item
    const currentItem = galleryData.find((item) => item.id === id);
    setactiveItem(currentItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setactiveItem(null);
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setgalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === active.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  //dnd core ends here

  return (
    <>
      <div className="min-h-screen">
        <div className="container flex flex-col items-center">
          <div className="bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y">
            <header className="text-2xl">Showcase</header>
            {/* dnd context */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8">
                <SortableContext
                  items={galleryData}
                  strategy={rectSortingStrategy}
                >
                  {galleryData.map((imageItem) => (
                    <div>
                      <img src={imageItem.slug} alt="" />
                    </div>
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

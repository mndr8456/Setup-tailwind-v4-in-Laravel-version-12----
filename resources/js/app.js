import Alpine from "alpinejs";
import "flowbite";

window.Alpine = Alpine;
Alpine.start();

window.reinitFlowbite = () => {
    initFlowbite();
};

// Re-init Flowbite after Livewire navigation
document.addEventListener("livewire:navigated", () => {
    window.reinitFlowbite();
});

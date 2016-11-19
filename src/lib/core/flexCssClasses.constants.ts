const elementHidden = "ng2flex-hidden";

const containerClass = "ng2flex-container";

const childClass = "ng2flex-container-child";

const orientationClasses = {
    horizontal: "ng2flex-horizontal-container",
    vertical: "ng2flex-vertical-container"
}

const itemsSeparationClasses = {
    all: "ng2flex-itm-separation-all",
    between: "ng2flex-itm-separation-between"
}

const verticalOrientationClasses = { top: "ng2flex-col-top", 
                          verticalCenter: "ng2flex-col-v-center", 
                          bottom: "ng2flex-col-bottom", 
                          left: "ng2flex-col-left", 
                          horizontalCenter: "ng2flex-col-h-center", 
                          right: "ng2flex-col-right"};

const horizontalOrientationClasses = {top: "ng2flex-row-top", 
                                      verticalCenter: "ng2flex-row-v-center", 
                                      bottom: "ng2flex-row-bottom", 
                                      left: "ng2flex-row-left", 
                                      horizontalCenter: "ng2flex-row-h-center", 
                                      right: "ng2flex-row-right"};

const flexElementClass = `${containerClass} ${childClass}`;

export const FLEX_CSS_CLASSES = { elementHidden,
                                  flexElementClass,
                                  containerClass, 
                                  childClass, 
                                  orientationClasses, 
                                  itemsSeparationClasses, 
                                  verticalOrientationClasses, 
                                  horizontalOrientationClasses };
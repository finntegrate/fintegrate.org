// Import required libraries
import Graph from "graphology";
import Sigma from "sigma";
import * as layoutAlgorithms from "graphology-layout";
import * as forceAtlas2 from "graphology-layout-forceatlas2";

/**
 * Initialize the Tapio network graph visualization
 * This function creates a network visualization showing the relationships between
 * Tapio agents, Finnish organizations, and immigrant needs.
 */
export function initializeGraph() {
    console.log("Initializing graph...");

    // Create a new graph instance
    const graph = new Graph();

    // Add Tapio as the central node
    graph.addNode("tapio", {
        label: "Tapio",
        category: "agent", // Use category for our own categorization
        subtype: "orchestrator",
        size: 15,
        color: "#3B82F6",
        x: 0,
        y: 0,
        type: "circle", // For sigma rendering - use circle type
    });

    // Add agent nodes
    const agents = [
        {
            id: "ilmarinen",
            label: "Ilmarinen",
            area: "Immigration Documents",
            color: "#3B82F6",
        },
        { id: "sampo", label: "Sampo", area: "Employment", color: "#3B82F6" },
        {
            id: "pellervo",
            label: "Pellervo",
            area: "Entrepreneurship",
            color: "#3B82F6",
        },
        {
            id: "rauni",
            label: "Rauni",
            area: "Social Benefits",
            color: "#3B82F6",
        },
        { id: "otso", label: "Otso", area: "Housing", color: "#3B82F6" },
        {
            id: "agricola",
            label: "Agricola",
            area: "Education & Language",
            color: "#3B82F6",
        },
        {
            id: "louhi",
            label: "Louhi",
            area: "Cultural Integration",
            color: "#3B82F6",
        },
        {
            id: "mielikki",
            label: "Mielikki",
            area: "Healthcare",
            color: "#3B82F6",
        },
        {
            id: "lempi",
            label: "Lempi",
            area: "Mental Wellbeing",
            color: "#3B82F6",
        },
    ];

    // Add organizations nodes
    const organizations = [
        {
            id: "migri",
            label: "Migri",
            area: "Immigration Service",
            color: "#10B981",
        },
        {
            id: "te",
            label: "TE Services",
            area: "Employment",
            color: "#10B981",
        },
        {
            id: "kela",
            label: "Kela",
            area: "Social Security",
            color: "#10B981",
        },
        { id: "dvv", label: "DVV", area: "Digital Services", color: "#10B981" },
        { id: "vero", label: "Vero", area: "Taxation", color: "#10B981" },
        {
            id: "municipalities",
            label: "Municipalities",
            area: "Local Services",
            color: "#10B981",
        },
        { id: "thl", label: "THL", area: "Health & Welfare", color: "#10B981" },
        { id: "opetus", label: "OPH", area: "Education", color: "#10B981" },
    ];

    // Add need nodes
    const needs = [
        { id: "docs", label: "Residence Permits", color: "#F59E0B" },
        { id: "work", label: "Finding Work", color: "#F59E0B" },
        { id: "business", label: "Starting Business", color: "#F59E0B" },
        { id: "benefits", label: "Social Benefits", color: "#F59E0B" },
        { id: "housing", label: "Finding Housing", color: "#F59E0B" },
        { id: "language", label: "Language Learning", color: "#F59E0B" },
        { id: "culture", label: "Cultural Understanding", color: "#F59E0B" },
        { id: "health", label: "Healthcare Access", color: "#F59E0B" },
        { id: "mental", label: "Mental Health", color: "#F59E0B" },
    ];

    // Add all nodes to the graph
    agents.forEach((agent) => {
        graph.addNode(agent.id, {
            label: agent.label,
            // Use custom attribute for our own categorization
            category: "agent",
            subtype: "specialist",
            area: agent.area,
            size: 10,
            color: agent.color,
            // For sigma rendering - all nodes use the circle type
            type: "circle",
        });
    });

    organizations.forEach((org) => {
        graph.addNode(org.id, {
            label: org.label,
            // Use custom attribute for our own categorization
            category: "organization",
            area: org.area,
            size: 8,
            color: org.color,
            // For sigma rendering - all nodes use the circle type
            type: "circle",
        });
    });

    needs.forEach((need) => {
        graph.addNode(need.id, {
            label: need.label,
            // Use custom attribute for our own categorization
            category: "need",
            size: 7,
            color: need.color,
            // For sigma rendering - all nodes use the circle type
            type: "circle",
        });
    });

    // Connect Tapio to all agents
    agents.forEach((agent) => {
        graph.addEdge("tapio", agent.id, {
            size: 2,
            edgeCategory: "coordination", // Custom categorization
            type: "line", // Sigma's built-in edge type
            color: "#3B82F6",
        });
    });

    // Connect agents to relevant organizations
    graph.addEdge("ilmarinen", "migri", {
        size: 2,
        edgeCategory: "knowledge", // Custom categorization
        type: "line", // Sigma's built-in edge type
        color: "#6B7280",
    });
    graph.addEdge("ilmarinen", "dvv", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("sampo", "te", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });
    graph.addEdge("sampo", "vero", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("pellervo", "te", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });
    graph.addEdge("pellervo", "vero", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("rauni", "kela", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });
    graph.addEdge("rauni", "municipalities", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("otso", "municipalities", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });
    graph.addEdge("otso", "kela", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("agricola", "opetus", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });
    graph.addEdge("agricola", "te", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("louhi", "municipalities", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("mielikki", "thl", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });
    graph.addEdge("mielikki", "kela", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    graph.addEdge("lempi", "thl", {
        size: 2,
        edgeCategory: "knowledge",
        type: "line",
        color: "#6B7280",
    });

    // Connect needs to relevant agents
    graph.addEdge("docs", "ilmarinen", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("work", "sampo", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("business", "pellervo", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("benefits", "rauni", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("housing", "otso", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("language", "agricola", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("culture", "louhi", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("health", "mielikki", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });
    graph.addEdge("mental", "lempi", {
        size: 2,
        edgeCategory: "service",
        type: "line",
        color: "#F59E0B",
    });

    // Apply circular layout
    layoutAlgorithms.circular.assign(graph, { scale: 100 });

    // Create sigma instance
    const container = document.getElementById("sigma-container");
    if (!container) {
        console.error("Could not find sigma-container element");
        return;
    }

    const renderer = new Sigma(graph, container, {
        // Default node type is 'circle' - we don't need to specify custom node programs
        // as all our nodes can be rendered as circles
        defaultNodeType: "circle",
        defaultEdgeType: "line",
        renderEdgeLabels: false,
        labelSize: 14,
        labelWeight: "bold",
        labelColor: {
            color: "#000000",
        },
        // Customize the node rendering
        nodeReducer: (node, data) => {
            const res = { ...data };

            if (data.category === "agent" && data.subtype === "orchestrator") {
                res.label = `${data.label}\n(Orchestrator)`;
            } else if (data.category === "agent") {
                res.label = `${data.label}\n(${data.area})`;
            } else if (data.category === "organization") {
                res.label = `${data.label}\n(${data.area})`;
            }

            // Handle highlighting for better interactivity
            if (data.highlighted) {
                res.color = "#FF5733"; // Highlight color
                res.zIndex = 1; // Bring highlighted nodes to front
                res.size = data.size * 1.2; // Make highlighted nodes slightly larger
            } else if (hoveredNode && !data.highlighted) {
                // Dim nodes that are not connected to the hovered node
                res.color = fadeColor(data.color, 0.3);
            }

            return res;
        },
        // Customize the edge rendering to visualize different categories
        edgeReducer: (edge, data) => {
            const res = { ...data };

            // Make certain edge types more visible and differentiated
            if (data.edgeCategory === "coordination") {
                res.size = data.size * 1.5; // Thicker lines
            } else if (data.edgeCategory === "knowledge") {
                // Leave as is
            } else if (data.edgeCategory === "service") {
                res.size = data.size * 1.2; // Slightly thicker than knowledge
            }

            // Handle highlighting for better interactivity
            if (data.highlighted) {
                res.color = "#FF5733"; // Highlight color
                res.zIndex = 1; // Bring highlighted edges to front
                res.size = data.size * 1.5; // Make highlighted edges thicker
            } else if (hoveredNode && !data.highlighted) {
                // Dim edges that are not connected to the hovered node
                res.color = fadeColor(data.color, 0.3);
            }

            return res;
        }
    });

    // Initialize animation functionality
    initializeAnimation(graph, renderer);

    // Initialize hover effects for better interactivity
    initializeHoverEffects(graph, renderer);
}

/**
 * Initialize the animation functionality for the graph
 * @param {Graph} graph - The graphology graph instance
 * @param {Sigma} renderer - The sigma renderer instance
 */
function initializeAnimation(graph, renderer) {
    let isAnimating = false;
    let forceAtlasInstance = null;
    let refreshInterval = null;
    const animateButton = document.getElementById("animate-button");

    if (!animateButton) {
        console.error("Could not find animate-button element");
        return;
    }

    animateButton.addEventListener("click", function () {
        if (isAnimating) {
            // Stop the force atlas layout
            if (forceAtlasInstance) {
                forceAtlasInstance.stop();
            }
            if (refreshInterval) {
                clearInterval(refreshInterval);
                refreshInterval = null;
            }
            animateButton.textContent = "Animate Network";
        } else {
            // Start the force atlas layout
            forceAtlasInstance = forceAtlas2.forceAtlas2(graph, {
                settings: {
                    gravity: 3,
                    scalingRatio: 5,
                },
            });

            // Start the layout algorithm
            forceAtlasInstance.start();

            // Set up a periodic refresh for the renderer
            refreshInterval = window.setInterval(() => {
                renderer.refresh();
            }, 50);

            animateButton.textContent = "Stop Animation";
        }
        isAnimating = !isAnimating;
    });
}

/**
 * Utility function to fade a color to indicate inactive state
 * @param {string} hexColor - The original hex color
 * @param {number} opacity - The opacity level (0-1)
 * @returns {string} - The faded color in rgba format
 */
function fadeColor(hexColor, opacity) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Return rgba color with specified opacity
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Global state for tracking the currently hovered node
let hoveredNode = null;

/**
 * Initialize hover effects to improve graph interactivity
 * @param {Graph} graph - The graphology graph instance
 * @param {Sigma} renderer - The sigma renderer instance
 */
function initializeHoverEffects(graph, renderer) {
    // Find the node info panel element
    const nodeInfoPanel = document.getElementById("node-info-panel");

    // Create a function that will update the node info panel
    function updateNodeInfoPanel(node) {
        if (!nodeInfoPanel) return;

        if (node) {
            const nodeAttributes = graph.getNodeAttributes(node);
            let infoHtml = `<h4 class="font-semibold text-lg mb-1">${nodeAttributes.label}</h4>`;

            // Add different content based on node category
            if (nodeAttributes.category === "agent") {
                const area = nodeAttributes.area || "Specialized agent";
                const subtype = nodeAttributes.subtype === "orchestrator" ? "Orchestrator" : "Specialist";
                infoHtml += `
          <p class="text-sm text-blue-600 mb-2">${subtype} in ${area}</p>
          <p class="text-xs">Connects needs with Finnish organizations</p>
        `;
            } else if (nodeAttributes.category === "organization") {
                infoHtml += `
          <p class="text-sm text-green-600 mb-2">${nodeAttributes.area}</p>
          <p class="text-xs">Official Finnish organization</p>
        `;
            } else if (nodeAttributes.category === "need") {
                infoHtml += `
          <p class="text-sm text-yellow-600 mb-2">Immigrant Need</p>
          <p class="text-xs">Click to see which agents can help with this need</p>
        `;
            }

            // Add connection info
            const neighbors = [ ...graph.neighbors(node) ];
            if (neighbors.length > 0) {
                infoHtml += `<p class="text-xs mt-2 font-medium">Connected to ${neighbors.length} node${neighbors.length > 1 ? 's' : ''}</p>`;
            }

            // Set content and position
            nodeInfoPanel.innerHTML = infoHtml;
            nodeInfoPanel.classList.add("visible");

            // Position the panel near the mouse but always inside the container
            const containerRect = renderer.getContainer().getBoundingClientRect();
            const mousePosition = renderer.viewportToScreen(nodeAttributes);

            // Calculate position to keep panel within container
            const panelWidth = 250; // max-width from CSS
            const panelHeight = nodeInfoPanel.offsetHeight;
            const padding = 20;

            let left = mousePosition.x + 10;
            if (left + panelWidth > containerRect.width - padding) {
                left = mousePosition.x - panelWidth - 10;
            }

            let top = mousePosition.y - panelHeight / 2;
            if (top < padding) {
                top = padding;
            } else if (top + panelHeight > containerRect.height - padding) {
                top = containerRect.height - panelHeight - padding;
            }

            nodeInfoPanel.style.left = `${left}px`;
            nodeInfoPanel.style.top = `${top}px`;
        } else {
            // Hide the panel when not hovering
            nodeInfoPanel.classList.remove("visible");
        }
    }

    // Create a function that will update the colors based on the currently hovered node
    function setHoveredNode(node) {
        if (node === hoveredNode) return; // Nothing to do if state doesn't change

        // Reset previous state
        if (hoveredNode) {
            // Reset all nodes to their original color
            graph.forEachNode((n) => {
                graph.setNodeAttribute(n, "highlighted", false);
            });

            // Reset all edges
            graph.forEachEdge((e) => {
                graph.setEdgeAttribute(e, "highlighted", false);
            });
        }

        // Update the global hoveredNode variable to make it accessible to the renderer
        hoveredNode = node;

        if (node) {
            // Highlight the hovered node and its connections
            graph.setNodeAttribute(node, "highlighted", true);

            // Highlight connected nodes and edges
            graph.forEachNeighbor(node, (neighbor) => {
                graph.setNodeAttribute(neighbor, "highlighted", true);

                // Get edges between the hovered node and its neighbors
                graph.forEachEdge(node, neighbor, (edge) => {
                    graph.setEdgeAttribute(edge, "highlighted", true);
                });
            });

            // Update the info panel with node details
            updateNodeInfoPanel(node);
        } else {
            // Hide the info panel when no node is hovered
            updateNodeInfoPanel(null);
        }

        // Refresh rendering
        renderer.refresh();
    }

    // Track mouse position for positioning the info panel
    renderer.getMouseCaptor().on("mousemovebody", (event) => {
        if (hoveredNode) {
            updateNodeInfoPanel(hoveredNode);
        }
    });

    // Register the events
    renderer.on("enterNode", ({ node }) => setHoveredNode(node));
    renderer.on("leaveNode", () => setHoveredNode(null));

    // Add keyboard accessibility
    const container = renderer.getContainer();
    container.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            // Focus management for tab navigation
            container.setAttribute("aria-activedescendant", "tapio");
            setHoveredNode("tapio"); // Default to Tapio node
        }
    });
}

// Initialize the graph when the document is loaded
document.addEventListener("DOMContentLoaded", initializeGraph);

// Import required libraries
import Graph from "graphology";
import Sigma from "sigma";
import * as layoutAlgorithms from "graphology-layout";
import * as forceAtlas2 from "graphology-layout-forceatlas2";

/**
 * Node and edge styling constants
 */
const COLORS = {
    AGENT: "#3B82F6", // Blue
    ORGANIZATION: "#10B981", // Green
    NEED: "#F59E0B", // Yellow/Orange
    KNOWLEDGE_EDGE: "#6B7280", // Gray
    HIGHLIGHT: "#FF5733", // Bright orange for highlighting
};

const NODE_SIZES = {
    ORCHESTRATOR: 15,
    AGENT: 10,
    ORGANIZATION: 8,
    NEED: 7,
};

const EDGE_TYPES = {
    COORDINATION: "coordination",
    KNOWLEDGE: "knowledge",
    SERVICE: "service",
};

/**
 * Helper function to add a node to the graph with consistent styling
 * @param {Graph} graph - The graph instance
 * @param {string} id - Node identifier
 * @param {object} attributes - Node attributes
 */
function addNode(graph, id, attributes) {
    graph.addNode(id, {
        ...attributes,
        type: "circle", // All nodes use circle type
    });
}

/**
 * Helper function to add an edge to the graph with consistent styling
 * @param {Graph} graph - The graph instance
 * @param {string} source - Source node id
 * @param {string} target - Target node id
 * @param {string} category - Edge category
 * @param {string} color - Edge color
 */
function addEdge(graph, source, target, category, color) {
    graph.addEdge(source, target, {
        size: 2,
        edgeCategory: category,
        type: "line",
        color: color,
    });
}

/**
 * Add a coordination edge between nodes (Tapio to agents)
 * @param {Graph} graph - The graph instance
 * @param {string} source - Source node id
 * @param {string} target - Target node id
 */
function addCoordinationEdge(graph, source, target) {
    addEdge(graph, source, target, EDGE_TYPES.COORDINATION, COLORS.AGENT);
}

/**
 * Add a knowledge edge between nodes (agents to organizations)
 * @param {Graph} graph - The graph instance
 * @param {string} source - Source node id
 * @param {string} target - Target node id
 */
function addKnowledgeEdge(graph, source, target) {
    addEdge(graph, source, target, EDGE_TYPES.KNOWLEDGE, COLORS.KNOWLEDGE_EDGE);
}

/**
 * Add a service edge between nodes (needs to agents)
 * @param {Graph} graph - The graph instance
 * @param {string} source - Source node id
 * @param {string} target - Target node id
 */
function addServiceEdge(graph, source, target) {
    addEdge(graph, source, target, EDGE_TYPES.SERVICE, COLORS.NEED);
}

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
    addNode(graph, "tapio", {
        label: "Tapio",
        category: "agent",
        subtype: "orchestrator",
        size: NODE_SIZES.ORCHESTRATOR,
        color: COLORS.AGENT,
        x: 0,
        y: 0,
    });

    // Add agent nodes
    const agents = [
        {
            id: "ilmarinen",
            label: "Ilmarinen",
            area: "Immigration Documents",
        },
        { id: "sampo", label: "Sampo", area: "Employment" },
        {
            id: "pellervo",
            label: "Pellervo",
            area: "Entrepreneurship",
        },
        {
            id: "rauni",
            label: "Rauni",
            area: "Social Benefits",
        },
        { id: "otso", label: "Otso", area: "Housing" },
        {
            id: "agricola",
            label: "Agricola",
            area: "Education & Language",
        },
        {
            id: "louhi",
            label: "Louhi",
            area: "Cultural Integration",
        },
        {
            id: "mielikki",
            label: "Mielikki",
            area: "Healthcare",
        },
        {
            id: "lempi",
            label: "Lempi",
            area: "Mental Wellbeing",
        },
    ];

    // Add organizations nodes
    const organizations = [
        {
            id: "migri",
            label: "Migri",
            area: "Immigration Service",
        },
        {
            id: "te",
            label: "TE Services",
            area: "Employment",
        },
        {
            id: "kela",
            label: "Kela",
            area: "Social Security",
        },
        { id: "dvv", label: "DVV", area: "Digital Services" },
        { id: "vero", label: "Vero", area: "Taxation" },
        {
            id: "municipalities",
            label: "Municipalities",
            area: "Local Services",
        },
        { id: "thl", label: "THL", area: "Health & Welfare" },
        { id: "opetus", label: "OPH", area: "Education" },
    ];

    // Add need nodes
    const needs = [
        { id: "docs", label: "Residence Permits" },
        { id: "work", label: "Finding Work" },
        { id: "business", label: "Starting Business" },
        { id: "benefits", label: "Social Benefits" },
        { id: "housing", label: "Finding Housing" },
        { id: "language", label: "Language Learning" },
        { id: "culture", label: "Cultural Understanding" },
        { id: "health", label: "Healthcare Access" },
        { id: "mental", label: "Mental Health" },
    ];

    // Add all nodes to the graph with consistent styling
    agents.forEach((agent) => {
        addNode(graph, agent.id, {
            label: agent.label,
            category: "agent",
            subtype: "specialist",
            area: agent.area,
            size: NODE_SIZES.AGENT,
            color: COLORS.AGENT,
        });
    });

    organizations.forEach((org) => {
        addNode(graph, org.id, {
            label: org.label,
            category: "organization",
            area: org.area,
            size: NODE_SIZES.ORGANIZATION,
            color: COLORS.ORGANIZATION,
        });
    });

    needs.forEach((need) => {
        addNode(graph, need.id, {
            label: need.label,
            category: "need",
            size: NODE_SIZES.NEED,
            color: COLORS.NEED,
        });
    });

    // Connect Tapio to all agents
    agents.forEach((agent) => {
        addCoordinationEdge(graph, "tapio", agent.id);
    });

    // Define agent to organization connections
    const agentOrgConnections = [
        { agent: "ilmarinen", orgs: [ "migri", "dvv" ] },
        { agent: "sampo", orgs: [ "te", "vero" ] },
        { agent: "pellervo", orgs: [ "te", "vero" ] },
        { agent: "rauni", orgs: [ "kela", "municipalities" ] },
        { agent: "otso", orgs: [ "municipalities", "kela" ] },
        { agent: "agricola", orgs: [ "opetus", "te" ] },
        { agent: "louhi", orgs: [ "municipalities" ] },
        { agent: "mielikki", orgs: [ "thl", "kela" ] },
        { agent: "lempi", orgs: [ "thl" ] },
    ];

    // Connect agents to relevant organizations
    agentOrgConnections.forEach(({ agent, orgs }) => {
        orgs.forEach(org => {
            addKnowledgeEdge(graph, agent, org);
        });
    });

    // Define need to agent connections
    const needAgentConnections = [
        { need: "docs", agent: "ilmarinen" },
        { need: "work", agent: "sampo" },
        { need: "business", agent: "pellervo" },
        { need: "benefits", agent: "rauni" },
        { need: "housing", agent: "otso" },
        { need: "language", agent: "agricola" },
        { need: "culture", agent: "louhi" },
        { need: "health", agent: "mielikki" },
        { need: "mental", agent: "lempi" },
    ];

    // Connect needs to relevant agents
    needAgentConnections.forEach(({ need, agent }) => {
        addServiceEdge(graph, need, agent);
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
                res.color = COLORS.HIGHLIGHT; // Highlight color
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
            if (data.edgeCategory === EDGE_TYPES.COORDINATION) {
                res.size = data.size * 1.5; // Thicker lines
            } else if (data.edgeCategory === EDGE_TYPES.KNOWLEDGE) {
                // Leave as is
            } else if (data.edgeCategory === EDGE_TYPES.SERVICE) {
                res.size = data.size * 1.2; // Slightly thicker than knowledge
            }

            // Handle highlighting for better interactivity
            if (data.highlighted) {
                res.color = COLORS.HIGHLIGHT; // Highlight color
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

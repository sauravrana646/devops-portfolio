import type { SVGProps } from "react";
import {
  layerOpacity,
  type ArchitectureLayerState,
} from "@/components/architecture/layer-opacity";

type DiagramProps = SVGProps<SVGSVGElement> & {
  title?: string;
  layers?: ArchitectureLayerState;
};

const font = "Plus Jakarta Sans, ui-sans-serif, sans-serif";
const layerTransition = "opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)";

export function GitOpsHubSpokeDiagram({
  title = "GitOps hub and spoke",
  layers,
  ...props
}: DiagramProps) {
  return (
    <svg viewBox="0 0 900 320" role="img" aria-label={title} {...props}>
      <rect width="900" height="320" fill="var(--ds-canvas-elevated)" rx="16" />
      <g data-layer="hub" opacity={layerOpacity(layers, "hub")} style={{ transition: layerTransition }}>
        <rect x="40" y="120" width="160" height="80" rx="16" fill="var(--ds-surface)" stroke="#9DB8A8" strokeWidth="2" />
        <text x="120" y="155" fill="var(--ds-ink)" fontSize="14" textAnchor="middle" fontFamily={font}>
          Argo CD Hub
        </text>
        <text x="120" y="175" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          mgmt cluster
        </text>
        <path d="M200 160 H370" stroke="#6F8F7E" strokeWidth="2" />
      </g>
      <g data-layer="spokes" opacity={layerOpacity(layers, "spokes")} style={{ transition: layerTransition }}>
        <rect x="370" y="40" width="140" height="70" rx="14" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="440" y="80" fill="var(--ds-ink-soft)" fontSize="13" textAnchor="middle" fontFamily={font}>
          Cluster A
        </text>
        <rect x="370" y="130" width="140" height="70" rx="14" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="440" y="170" fill="var(--ds-ink-soft)" fontSize="13" textAnchor="middle" fontFamily={font}>
          Cluster B
        </text>
        <rect x="370" y="220" width="140" height="70" rx="14" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="440" y="260" fill="var(--ds-ink-soft)" fontSize="13" textAnchor="middle" fontFamily={font}>
          Cluster C
        </text>
      </g>
      <g data-layer="git" opacity={layerOpacity(layers, "git")} style={{ transition: layerTransition }}>
        <rect x="660" y="120" width="160" height="80" rx="16" fill="var(--ds-surface)" stroke="#E8D9A8" strokeWidth="2" />
        <text x="740" y="155" fill="var(--ds-ink)" fontSize="14" textAnchor="middle" fontFamily={font}>
          Git (source)
        </text>
        <text x="740" y="175" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          monorepo
        </text>
        <path d="M510 75 H580 V160 H660" stroke="#9AABAE" strokeWidth="2" fill="none" />
        <path d="M510 165 H660" stroke="#9AABAE" strokeWidth="2" />
        <path d="M510 255 H580 V160" stroke="#9AABAE" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

export function GitOpsHubSpokeLargeDiagram({
  title = "Large GitOps hub and spoke architecture",
  layers,
  ...props
}: DiagramProps) {
  return (
    <svg viewBox="0 0 1100 480" role="img" aria-label={title} {...props}>
      <rect width="1100" height="480" fill="var(--ds-canvas-elevated)" rx="16" />
      <g data-layer="git" opacity={layerOpacity(layers, "git")} style={{ transition: layerTransition }}>
        <rect x="40" y="190" width="180" height="100" rx="14" fill="var(--ds-surface)" stroke="#E8D9A8" strokeWidth="2" />
        <text x="130" y="230" fill="var(--ds-ink)" fontSize="16" textAnchor="middle" fontFamily={font}>
          Git monorepo
        </text>
        <text x="130" y="255" fill="var(--ds-muted)" fontSize="12" textAnchor="middle" fontFamily={font}>
          source of truth
        </text>
        <path d="M220 240 H320" stroke="#E8D9A8" strokeWidth="2" />
      </g>
      <g data-layer="hub" opacity={layerOpacity(layers, "hub")} style={{ transition: layerTransition }}>
        <rect x="320" y="170" width="200" height="140" rx="14" fill="var(--ds-surface)" stroke="#6F8F7E" strokeWidth="2" />
        <text x="420" y="220" fill="var(--ds-ink)" fontSize="16" textAnchor="middle" fontFamily={font}>
          Argo CD Hub
        </text>
        <text x="420" y="245" fill="var(--ds-ink-soft)" fontSize="12" textAnchor="middle" fontFamily={font}>
          mgmt cluster
        </text>
        <text x="420" y="270" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          ApplicationSets
        </text>
        <path d="M520 200 C600 200, 640 85, 700 85" stroke="#6F8F7E" strokeWidth="1.75" fill="none" />
        <path d="M520 240 H700" stroke="#6F8F7E" strokeWidth="1.75" />
        <path d="M520 280 C600 280, 640 345, 700 345" stroke="#6F8F7E" strokeWidth="1.75" fill="none" />
      </g>
      <g data-layer="ci" opacity={layerOpacity(layers, "ci")} style={{ transition: layerTransition }}>
        <rect x="320" y="40" width="200" height="70" rx="12" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="420" y="70" fill="var(--ds-ink-soft)" fontSize="13" textAnchor="middle" fontFamily={font}>
          CI · PR diffs only
        </text>
        <text x="420" y="90" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          no kubectl to prod
        </text>
        <path d="M420 110 V170" stroke="#9AABAE" strokeWidth="1.5" />
      </g>
      <g data-layer="spokes" opacity={layerOpacity(layers, "spokes")} style={{ transition: layerTransition }}>
        <rect x="700" y="40" width="180" height="90" rx="14" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="790" y="80" fill="var(--ds-ink)" fontSize="14" textAnchor="middle" fontFamily={font}>
          Spoke A
        </text>
        <text x="790" y="105" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          prod · EU-west
        </text>
        <rect x="700" y="170" width="180" height="90" rx="14" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="790" y="210" fill="var(--ds-ink)" fontSize="14" textAnchor="middle" fontFamily={font}>
          Spoke B
        </text>
        <text x="790" y="235" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          prod · EU-central
        </text>
        <rect x="700" y="300" width="180" height="90" rx="14" fill="var(--ds-canvas)" stroke="#C5D9CC" strokeWidth="2" />
        <text x="790" y="340" fill="var(--ds-ink)" fontSize="14" textAnchor="middle" fontFamily={font}>
          Spoke C
        </text>
        <text x="790" y="365" fill="var(--ds-muted)" fontSize="11" textAnchor="middle" fontFamily={font}>
          prod · EU-north
        </text>
      </g>
      <g data-layer="secrets" opacity={layerOpacity(layers, "secrets")} style={{ transition: layerTransition }}>
        <rect
          x="940"
          y="170"
          width="120"
          height="90"
          rx="12"
          fill="var(--ds-surface)"
          stroke="#6F8F7E"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="1000" y="210" fill="#6F8F7E" fontSize="12" textAnchor="middle" fontFamily={font}>
          ESO
        </text>
        <text x="1000" y="230" fill="var(--ds-muted)" fontSize="10" textAnchor="middle" fontFamily={font}>
          secrets
        </text>
        <path d="M880 215 H940" stroke="#9AABAE" strokeWidth="1.25" strokeDasharray="4 3" />
      </g>
    </svg>
  );
}

export function ZeroTrustMeshDiagram({ title = "Zero-trust ingress mesh", ...props }: DiagramProps) {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-label={title} {...props}>
      <rect width="480" height="300" fill="#F7FAF8" rx="12" />
      <rect x="60" y="40" width="360" height="40" rx="10" fill="#ffffff" stroke="#6F8F7E" strokeWidth="2" />
      <text x="240" y="66" fill="#243038" fontSize="12" textAnchor="middle" fontFamily={font}>
        Edge · mTLS
      </text>
      <rect x="60" y="120" width="160" height="100" rx="12" fill="#EEF5F1" stroke="#C5D9CC" strokeWidth="2" />
      <text x="140" y="175" fill="#3D4F58" fontSize="12" textAnchor="middle" fontFamily={font}>
        svc A
      </text>
      <rect x="260" y="120" width="160" height="100" rx="12" fill="#EEF5F1" stroke="#C5D9CC" strokeWidth="2" />
      <text x="340" y="175" fill="#3D4F58" fontSize="12" textAnchor="middle" fontFamily={font}>
        svc B
      </text>
      <path d="M240 80 V120" stroke="#6F8F7E" strokeWidth="2" />
      <circle cx="240" cy="200" r="28" fill="#ffffff" stroke="#E8B49A" strokeWidth="2" />
      <text x="240" y="204" fill="#2A3F45" fontSize="10" textAnchor="middle" fontFamily={font}>
        mesh
      </text>
    </svg>
  );
}

export function SignedSupplyChainDiagram({ title = "Signed supply-chain pipeline", ...props }: DiagramProps) {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-label={title} {...props}>
      <rect width="480" height="300" fill="#F7FAF8" rx="12" />
      <rect x="40" y="80" width="80" height="40" rx="8" fill="#ffffff" stroke="#6F8F7E" strokeWidth="2" />
      <text x="80" y="105" fill="#243038" fontSize="11" textAnchor="middle" fontFamily={font}>
        Commit
      </text>
      <rect x="160" y="80" width="80" height="40" rx="8" fill="#EEF5F1" stroke="#C5D9CC" strokeWidth="2" />
      <text x="200" y="105" fill="#3D4F58" fontSize="11" textAnchor="middle" fontFamily={font}>
        Build
      </text>
      <rect x="280" y="80" width="80" height="40" rx="8" fill="#EEF5F1" stroke="#C5D9CC" strokeWidth="2" />
      <text x="320" y="105" fill="#3D4F58" fontSize="11" textAnchor="middle" fontFamily={font}>
        Sign
      </text>
      <rect x="400" y="80" width="50" height="40" rx="8" fill="#ffffff" stroke="#E8D9A8" strokeWidth="2" />
      <text x="425" y="105" fill="#243038" fontSize="11" textAnchor="middle" fontFamily={font}>
        Prod
      </text>
      <path d="M120 100 H160 M240 100 H280 M360 100 H400" stroke="#9AABAE" strokeWidth="1.5" />
      <rect
        x="160"
        y="180"
        width="200"
        height="50"
        rx="10"
        fill="#ffffff"
        stroke="#6F8F7E"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <text x="260" y="210" fill="#6B7C82" fontSize="11" textAnchor="middle" fontFamily={font}>
        OIDC · Cosign · Policy
      </text>
    </svg>
  );
}

export function IdpGoldenPathsDiagram({ title = "IDP golden paths", ...props }: DiagramProps) {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-label={title} {...props}>
      <rect width="480" height="300" fill="#F7FAF8" rx="12" />
      <rect x="80" y="50" width="320" height="60" rx="12" fill="#ffffff" stroke="#6F8F7E" strokeWidth="2" />
      <text x="240" y="85" fill="#243038" fontSize="13" textAnchor="middle" fontFamily={font}>
        Golden path portal
      </text>
      <rect x="80" y="150" width="140" height="90" rx="12" fill="#EEF5F1" stroke="#C5D9CC" strokeWidth="2" />
      <text x="150" y="200" fill="#6B7C82" fontSize="12" textAnchor="middle" fontFamily={font}>
        templates
      </text>
      <rect x="260" y="150" width="140" height="90" rx="12" fill="#EEF5F1" stroke="#C5D9CC" strokeWidth="2" />
      <text x="330" y="200" fill="#6B7C82" fontSize="12" textAnchor="middle" fontFamily={font}>
        observability
      </text>
    </svg>
  );
}

export function ArchitectureThumb({ id }: { id: string }) {
  const className = "h-full w-full";
  switch (id) {
    case "gitops-hub-spoke":
      return <GitOpsHubSpokeDiagram className={className} />;
    case "zero-trust-mesh":
      return <ZeroTrustMeshDiagram className={className} />;
    case "signed-supply-chain":
      return <SignedSupplyChainDiagram className={className} />;
    case "idp-golden-paths":
      return <IdpGoldenPathsDiagram className={className} />;
    default:
      return <GitOpsHubSpokeDiagram className={className} />;
  }
}

export function ArchitectureFigure({
  id,
  large = false,
  layers,
}: {
  id: string;
  large?: boolean;
  layers?: ArchitectureLayerState;
}) {
  const className = "h-auto w-full min-w-[640px]";
  if (id === "gitops-hub-spoke" && large) {
    return <GitOpsHubSpokeLargeDiagram className={className} layers={layers} />;
  }
  switch (id) {
    case "gitops-hub-spoke":
      return <GitOpsHubSpokeDiagram className={className} layers={layers} />;
    case "zero-trust-mesh":
      return <ZeroTrustMeshDiagram className={`${className} max-w-3xl`} />;
    case "signed-supply-chain":
      return <SignedSupplyChainDiagram className={`${className} max-w-3xl`} />;
    case "idp-golden-paths":
      return <IdpGoldenPathsDiagram className={`${className} max-w-3xl`} />;
    default:
      return <GitOpsHubSpokeDiagram className={className} layers={layers} />;
  }
}

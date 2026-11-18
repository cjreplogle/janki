Builds the Janki 3D anatomy assets.

    npm i @gltf-transform/core@4.1.1 @gltf-transform/extensions@4.1.1 @gltf-transform/functions@4.1.1 \
          draco3dgltf@1.5.7 meshoptimizer@0.22.0 three@0.160.0 esbuild@0.24.0
    # source models: ../za/{skeletal,muscular,nervous,cardiovascular}.glb from github.com/nqwrc/3d-anatomy
    node build.mjs                        # -> lowerlimb.glb  (copy to assets/anatomy3d/_jk3d_lowerlimb.glb)
    npx esbuild engine.js --bundle --minify --format=iife --target=es2019 --outfile=_jk3d-anat-59.js

## Upper limb
`node build_ul.mjs` (run from a folder with `../za/*.glb`) → `upperlimb.glb`; ship as `_jk3d_upperlimb2.glb` (bump the number on changes). Landmarks are spec-driven in `engine.js` (`UL_SPECS`); bones are subdivided at load so patches are smooth.

## Trunk / CT context
`node build_trunk.mjs` → `trunk.glb`, shipped as `_jk3d_trunk6.glb`. Which source parts go in, and their layer, is the `RULES` table at the top (extend there). The engine slices it into the CT panes listed in `CT_CONTEXT.planes` (engine.js); CT shades per layer are in `CTC`. Intended to be reused as the model for back / thorax cards.

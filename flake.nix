{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  description = "Valkyrie";

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      rec {

        devDependencies = with pkgs; [ 
            nodejs_20
            yarn
        ] ;

        devShells = {
          default = pkgs.mkShell {
            buildInputs = devDependencies;
          };
        };
    }
  );
}
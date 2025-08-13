let
    pkgs = import <nixpkgs> {};
in pkgs.mkShell {
    packages = [
        (pkgs.python3.withPackages (python-pkgs: [
            python-pkgs.pyside6
        ]))
    ];

    shellHook = ''
        echo python3 -m http.server
    '';
}

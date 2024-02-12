  /*
            In the first verion the function returns a string for the head node
            href.
            However this can only split names. In V2 a function accepts many tokens
            to install weight types. Each node produces a unique font for the weight.

            -------------------------------------------------------------------

            str:
                font-pack-roboto-300-400-500

            URL:
                family=Roboto:wght@300,400,500

            class
                .font-pack-robot-300 {
                    font-family: Roboto
                    font-weight: 300
                }

            -------------------------------------------------------------------

            str:
                font-pack-roboto-400-i300

            url:
                family=Roboto+Condensed:ital,wght@0,400;1,300

            classes:
                .font-pack-roboto-i300 {
                        font-family: Roboto, sans-serif;
                        font-weight: 300;
                        font-style: italic;
                }

                .font-pack-roboto-400 {
                        font-family: Roboto, sans-serif;
                        font-weight: 400;
                }

            -------------------------------------------------------------------

            str:
                font-pack-exo+2-i

            url:
                family=Exo+2:ital@1

            -------------------------------------------------------------------

            str:
                font-pack-exo+2-i300-i400-i500-i600-i700-i800-i900 // ugly.

            url:
                family=Exo+2:ital,wght@1,300;1,400;1,500;1,600;1,700;1,800;1,900

         */
        /* links required:

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">

            <link href="https://fonts.googleapis.com/css2?
                family=Roboto+Condensed:ital,wght@0,400;0,700;1,700
                &family=Roboto:wght@300&display=swap" rel="stylesheet">
            <link rel="preconnect" href="https://fonts.googleapis.com">

                family=Barriecito
                family=Roboto:wght@300
                family=Roboto+Condensed:ital,wght@0,300;
                                                    1,300
                family=Roboto+Condensed:ital,wght@0,300;
                                                    0,400;
                                                    1,300;
                                                    1,400
                family=Roboto+Condensed:ital,wght@0,300;
                                                    0,400;
                                                    0,700;
                                                    1,300;
                                                    1,400;
                                                    1,700

                family=Montserrat:ital,wght@0,100;
                                            0,200;
                                            0,300;
                                            0,400;
                                            0,500;
                                            0,600;
                                            0,700;
                                            0,800;
                                            0,900;
                                            1,100;
                                            1,200;
                                            1,300;
                                            1,400;
                                            1,500;
                                            1,600;
                                            1,700;
                                            1,800;
                                            1,900
                family=Roboto+Condensed:ital,wght@0,300;
                                                  0,400;
                                                  0,700;
                                                  1,300;
                                                  1,400;
                                                  1,700
                family=Roboto+Condensed:ital,wght@0,300;
                                                  0,400;
                                                  0,700;
                                                  1,300;
                                                  1,400;
                                                  1,700
                family=Roboto:wght@300

                family=Montserrat:wght@100;
                                       200;
                                       300;
                                       400;
                                       500;
                                       600;
                                       700;
                                       800;
                                       900

            # font exo-2 regulat italic
                family=Exo+2:ital@1

            # font exo-2 all italic
                family=Exo+2:ital,wght@1,300;
                                       1,400;
                                       1,500;
                                       1,600;
                                       1,700;
                                       1,800;
                                       1,900

        CSS Required:

            font-family: 'Roboto', sans-serif;
         */
  // font-pack-roboto-100-400-900-i300-i400-i700-i900
        // family=Roboto:ital,wght@0,100;0,400;0,900;1,300;1,400;1,700;1,900
        // return familyStrings

        // family=Roboto+Mono:ital,wght@0,300;0,400;0,500;1,400
        //  &family=Roboto:ital,wght@0,100;0,400;0,900;1,300;1,400;1,700;1,900
        //


            /*
                family=Roboto+Condensed:ital,wght@0,300;
                                                  0,400;
                                                  0,700;
                                                  1,300;
                                                  1,400;
                                                  1,700
                family=Roboto:wght@300

                family=Montserrat:wght@100;
                                       200;
                                       300;
                                       400;
                                       500;
                                       600;
                                       700;
                                       800;
                                       900

                # font exo-2 regulat italic
                family=Exo+2:ital@1

                # font exo-2 all italic
                family=Exo+2:ital,wght@1,300;
                                       1,400;
                                       1,500;
                                       1,600;
                                       1,700;
                                       1,800;
                                       1,900

                <link href="https://fonts.googleapis.com/css2?
                    family=Roboto:ital,wght
                            @0,100;
                            0,400;
                            0,900;
                            1,300;
                            1,400;
                            1,700;
                            1,900&display=swap" rel="stylesheet">
             */
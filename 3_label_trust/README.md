# Open Labels Initiative: Label Trust

The OLI Label Pool is a community platform where anyone can contribute labels to. Because of this open-source nature, we need a way to ensure the quality and trustworthiness of the data when reading labels out of the Label Pool. This is where Label Trust comes in.

Label Trust is a product that allows users to extract only the highest-quality labels from the pool. We achieve this by applying a transitive trust algorithm, which helps to identify and filter down to only the most reliable contributors. This ensures that even though anyone can add labels, you can confidently use the most trusted data for your specific needs.

## Whitelist

more soon

## Transitive Trust

Let N(G) be the set of all nodes in G.

Let F(G, A, B) be the trust score of node B from the perspective of node A.

0 ≤ W(G, S, T) ≤ 1
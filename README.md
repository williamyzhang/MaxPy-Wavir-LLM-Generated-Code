# Intro

This repository contains all the LLM-generated code used for our evaluation. 

# Contents

## Code
There are 6 folders of LLM-generated code for each language/level of representation:
1. MaxMSP (direct JSON)
2. MaxPy (normal metaprogramming)
3. Rich MaxPy (rich metaprogramming)
4. Wavir (direct JSON)
5. Web Audio (normal metaprogramming)
6. Rich Web Audio (rich metaprogramming)

Each folder for a language/level of representation contains 10 subfolders, each of which contains the 10 trials generated for that benchmark.

## Result CSVs
**pass-at-k-all-samples.csv** contains the pass@k scores across all generated samples.

**pass-at-k-well-formed.csv** contains the pass@k scores across only those samples that are well-formed (parsed/compiled).

**semantically-correct.csv** contains the raw semantic correctness scores for each benchmark and language, as assigned by our evaluators.

**well-formed.csv** contains the number of samples that are well-formed for each benchmark and language.

**complexity.csv** contains the average complexity (measured by node count) of well-formed samples for each benchmark and language. Note that there are **NaN** values for Wavir JSON, as there were some benchmarks for which no generated Wavir code was well-formed.

# Evaluation Process
Our manual evaluation process for semantic correctness is as follows:

First, the evaluator pair was provided with a correct example of each benchmark sound in the target language, coded by a developer on our team. 

For generated code samples of specific benchmarks, each individual evaluator judges whether the code and the sound it produces resembles the correct example of the benchmark. To be correct, a specific benchmark needs to both produce the sound and have the correct nodes and connections in its code for that particular benchmark. 

For generated code samples of open-ended benchmarks, each individual evaluator judges whether the sound produced resembles, to their ears, the intended sound. In this case, the exact code implementation is less relevant because there are multiple ways to code the sound. There are also many forms an open-ended sound such as a "bird call" could take while still being considered correct. 

If the evaluators agree, then they mark the code sample as correct. If one or both evaluators are unsure about a sample, or if they disagree, the pair consults as a team consisting of them and at least one additional evaluator. The team decides through discussion whether to mark the sample correct.

The team repeats this process for each code sample for each benchmark in the language category. The total number of samples marked correct across specific benchmarks, creative benchmarks, and all benchmarks is the number of semantically correctn samples, used to calculate specific, creative, and overall pass@k scores.
